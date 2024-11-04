import React, { useState, useEffect } from "react";
import axios from "axios";

const Genres = () => {
  const [genreName, setGenreName] = useState("");
  const [editGenreId, setEditGenreId] = useState(null);
  const [allGenres, setAllGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Fungsi untuk mengambil daftar genre
  const fetchGenres = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/genres", {
        params: { limit: 1000 },
      });
      setAllGenres(response.data.genres || []);
      setFilteredGenres(response.data.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    const results = searchTerm
      ? allGenres.filter((genre) =>
          genre.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allGenres;

    setFilteredGenres(results);
    setCurrentPage(1);
  }, [searchTerm, allGenres]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/genres", {
        name: genreName,
      });
      alert("Genre added successfully!");
      setGenreName("");

      // Memanggil ulang fetchGenres setelah berhasil menambahkan genre
      fetchGenres();
    } catch (error) {
      console.error("Error adding genre:", error);
      alert("Failed to add genre.");
    }
  };

  const handleEdit = (genre) => {
    setEditGenreId(genre.id);
    setGenreName(genre.name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/genres/${editGenreId}`, {
        name: genreName,
      });
      setAllGenres(
        allGenres.map((genre) =>
          genre.id === editGenreId ? { ...genre, name: genreName } : genre
        )
      );
      setGenreName("");
      setEditGenreId(null);
      alert("Genre updated successfully!");
    } catch (error) {
      console.error("Error updating genre:", error);
      alert("Failed to update genre.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this genre?");
  
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/genres/${id}`);
      setAllGenres(allGenres.filter((genre) => genre.id !== id));
      alert("Genre deleted successfully!");
    } catch (error) {
      console.error("Error deleting genre:", error);
      alert("Failed to delete genre.");
    }
  };
  
  const indexOfLastGenre = currentPage * itemsPerPage;
  const indexOfFirstGenre = indexOfLastGenre - itemsPerPage;
  const currentGenres = filteredGenres.slice(
    indexOfFirstGenre,
    indexOfLastGenre
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredGenres.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="tw-px-4 tw-flex tw-flex-col tw-justify-start tw-items-center tw-bg-gray-100 tw-min-h-screen tw-w-full">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-w-full tw-mx-4 sm:tw-mx-6 lg:tw-mx-auto tw-my-4">
        <div className="tw-p-4">
          <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
            Page Genres
          </h2>
          <h1 className="tw-text-gray-500 tw-font-semibold tw-text-lg tw-mt-4">
            {editGenreId ? "Edit Genre" : "Insert Genre"}
          </h1>
          <form onSubmit={editGenreId ? handleUpdate : handleSubmit}>
            <div className="tw-flex tw-space-x-4 tw-items-center">
              <input
                type="text"
                placeholder="Enter genre name"
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
                className="tw-bg-indigo-100/30 tw-px-4 tw-py-2 tw-rounded-lg tw-border focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
              />
              <button
                type="submit"
                className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-green-600 tw-py-2 tw-px-6 tw-font-dm tw-text-base tw-font-medium tw-text-white tw-shadow-xl tw-shadow-green-100/75 tw-transition-transform tw-duration-200 tw-ease-in-out hover:tw-scale-[1.02]"
              >
                {editGenreId ? "Update" : "Submit"}
              </button>
            </div>
          </form>

          {/* Search Input */}
          <div className="tw-mt-2 tw-flex tw-justify-end">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tw-border tw-border-gray-400 focus:tw-outline-0 focus:tw-ring-1 focus:tw-ring-gray-300 tw-rounded-full tw-px-4 tw-py-1 tw-w-full sm:tw-w-auto"
            />
          </div>

          <div className="tw-mt-4">
            <div className="tw-overflow-x-auto">
              <table className="tw-min-w-full tw-bg-white tw-border tw-border-gray-300">
                <thead>
                  <tr className="tw-bg-gray-100">
                    <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                      #
                    </th>
                    <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                      Genres
                    </th>
                    <th className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300 tw-text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentGenres.length > 0 ? (
                    currentGenres.map((genre, index) => (
                      <tr key={genre.id} className={
                          index % 2 === 0 ? "tw-bg-white" : "tw-bg-gray-50"
                        }>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          {indexOfFirstGenre + index + 1}
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          {genre.name}
                        </td>
                        <td className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300">
                          <a
                            onClick={() => handleEdit(genre)}
                            className="tw-text-blue-600 hover:tw-underline tw-cursor-pointer"
                          >
                            Rename
                          </a>
                          <span className="tw-text-gray-500 tw-px-2">|</span>
                          <a
                            onClick={() => handleDelete(genre.id)}
                            className="tw-text-red-600 hover:tw-underline tw-cursor-pointer"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="tw-py-2 tw-px-4 tw-border-b tw-border-gray-300"
                        colSpan="3"
                      >
                        No genres found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="tw-flex tw-justify-between tw-mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded disabled:tw-opacity-50"
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                onClick={handleNextPage}
                disabled={
                  currentPage ===
                  Math.ceil(filteredGenres.length / itemsPerPage)
                }
                className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded disabled:tw-opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genres;
