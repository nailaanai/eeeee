import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        const usersWithStatus = response.data.users.map((user) => ({
          ...user,
          status: user.isVerified ? "Active" : "Inactive",
        }));
        setUsers(usersWithStatus);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Confirm deletion with the user
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      // Send DELETE request to delete user
      await axios.delete(`http://localhost:5000/api/users/${userId}`);

      // Fetch updated list of users
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  const toggleStatus = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);
      const newStatus = !user.isVerified;

      await axios.put(`http://localhost:5000/api/users/${userId}/status`, {
        isVerified: newStatus,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                isVerified: newStatus,
                status: newStatus ? "Active" : "Inactive",
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      setError("Failed to update user status");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/role`, {
        role: newRole,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setRoleDropdownOpen(null);
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update user role");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewUserInput = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      // Send request to create a new user
      await axios.post("http://localhost:5000/api/users", {
        name: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });

      // Fetch the updated list of users after adding the new user
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users); // Update the users state with the new list

      // Reset form fields and error state after successful submission
      setNewUser({ username: "", email: "", password: "" });
      setError(null);
    } catch (error) {
      // Fetch users even when an error occurs
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data.users); // Update the users state with the current list
      } catch (fetchError) {
        console.error("Error fetching users after failed add:", fetchError);
      }

      // Display the specific error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add user");
      }
      console.error("Error adding user:", error);
    }
  };

  const openEditModal = (user) => {
    setEditData({
      id: user.id, // Add user ID here
      username: user.name,
      email: user.email,
      password: "",
      retypePassword: "",
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditData({ username: "", email: "", password: "", retypePassword: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
  
    if (editData.password !== editData.retypePassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      // Send PUT request to update user data
      await axios.put(`http://localhost:5000/api/users/${editData.id}`, {
        name: editData.username,
        email: editData.email,
        password: editData.password || undefined, // Only send password if it is set
      });
  
      // Fetch updated list of users after editing the user
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users);
  
      // Show success alert
      window.alert("User updated successfully!");
  
      // Reset form fields, error state, and close modal
      setError(null);
      closeEditModal();
    } catch (error) {
      // Display specific error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update user");
      }
      console.error("Error updating user:", error);
    }
  };
  

  return (
    <div className="tw-px-4 tw-flex tw-flex-col tw-justify-start tw-items-center tw-bg-gray-100 tw-min-h-screen tw-w-full">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-w-full tw-mx-4 sm:tw-mx-6 lg:tw-mx-auto tw-my-4">
        <div className="tw-p-4">
          <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            Page Users
          </h2>

          {/* Insert Users Section */}
          <div>
            <h1 className="tw-text-gray-500 tw-font-semibold tw-text-lg tw-mt-4">
              Insert Users
            </h1>
            <div className="tw-flex tw-space-x-4 tw-items-center">
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                value={newUser.username}
                onChange={handleNewUserInput}
                className="tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <input
                type="text"
                placeholder="Enter email"
                name="email"
                value={newUser.email}
                onChange={handleNewUserInput}
                className="tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={newUser.password}
                onChange={handleNewUserInput}
                className="tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
            </div>
            <div className="tw-mt-2">
              <button
                onClick={handleAddUser}
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-green-600 tw-py-2 tw-px-6 tw-font-medium tw-text-white"
              >
                Submit
              </button>
            </div>

            {/* Search Bar */}
            <div className="tw-mt-2 tw-flex tw-justify-end">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="tw-border tw-border-gray-400 focus:tw-outline-0 focus:tw-ring-1 focus:tw-ring-gray-300 tw-rounded-full tw-px-4 tw-py-1 tw-w-full sm:tw-w-auto"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="tw-mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="tw-text-red-500">{error}</p>
            ) : (
              <div className="tw-overflow-x-auto">
                <table className="tw-min-w-full tw-bg-white tw-border tw-border-gray-300">
                  <thead>
                    <tr className="tw-bg-gray-100">
                      <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                        #
                      </th>
                      <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                        Username
                      </th>
                      <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                        Email
                      </th>
                      <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                        Status
                      </th>
                      <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                        Role
                      </th>
                      <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className={
                          index % 2 === 0 ? "tw-bg-white" : "tw-bg-gray-50"
                        }
                      >
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          {index + 1}
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          {user.name}
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          {user.email}
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          <button
                            onClick={() => toggleStatus(user.id)}
                            className={`tw-px-4 tw-py-1 tw-rounded-full tw-text-white ${
                              user.isVerified
                                ? "tw-bg-green-500"
                                : "tw-bg-red-500"
                            }`}
                          >
                            {user.isVerified ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 relative">
                          <button
                            onClick={() =>
                              setRoleDropdownOpen(
                                roleDropdownOpen === user.id ? null : user.id
                              )
                            }
                            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-1 tw-rounded-full focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
                          >
                            {user.role || "User"}
                          </button>
                          {roleDropdownOpen === user.id && (
                            <div className="tw-absolute tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-mt-1 tw-z-10">
                              <button
                                onClick={() =>
                                  handleRoleChange(user.id, "User")
                                }
                                className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-left hover:tw-bg-blue-100"
                              >
                                User
                              </button>
                              <button
                                onClick={() =>
                                  handleRoleChange(user.id, "Admin")
                                }
                                className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-left hover:tw-bg-blue-100"
                              >
                                Admin
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          <a
                            href="#"
                            className="tw-text-blue-600 hover:tw-underline tw-mr-2"
                            onClick={() => openEditModal(user)}
                          >
                            Edit
                          </a>
                          <span className="tw-text-gray-500">|</span>
                          <a
                            href="#"
                            className="tw-text-red-600 hover:tw-underline tw-ml-2"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/30 tw-flex tw-justify-center tw-items-center tw-z-50">
          <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-full sm:tw-w-3/4 lg:tw-w-1/2 tw-p-6">
            <h3 className="tw-text-xl tw-font-bold tw-text-gray-800">
              Edit User
            </h3>
            <form onSubmit={handleEditSubmit} className="tw-space-y-4 tw-mt-4">
              {error && <p className="tw-text-red-500">{error}</p>}
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="tw-w-full tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="tw-w-full tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <input
                type="password"
                name="password"
                value={editData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="tw-w-full tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <input
                type="password"
                name="retypePassword"
                value={editData.retypePassword}
                onChange={handleInputChange}
                placeholder="Re-type Password"
                className="tw-w-full tw-bg-indigo-100/30 tw-border tw-px-4 tw-py-2 tw-rounded-lg focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <div className="tw-flex tw-justify-end tw-space-x-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="tw-bg-gray-500 tw-px-4 tw-py-2 tw-rounded-lg tw-text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tw-bg-green-600 tw-px-4 tw-py-2 tw-rounded-lg tw-text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
