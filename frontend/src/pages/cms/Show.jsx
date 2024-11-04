import React, { useState } from "react";

const Show = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState(null);

  const handleEditClick = (drama) => {
    setSelectedDrama(drama);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDrama(null);
  };

  return (
    <div className="tw-px-4 tw-flex tw-flex-col tw-justify-start tw-items-center tw-bg-gray-100 tw-min-h-screen tw-w-full">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-w-full tw-mx-4 sm:tw-mx-6 lg:tw-max-w-6xl lg:tw-mx-auto tw-my-4">
        <div className="tw-overflow-x-auto tw-p-4">
          <div className="tw-mb-2">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
              Page Show Drama
            </h2>
          </div>

          {/* Filter and search section */}
          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center tw-mb-4 tw-space-y-4 sm:tw-space-y-0">
            <div className="tw-flex tw-space-x-4">
              <div>
                <label className="tw-mr-2">Filtered by:</label>
                <select className="tw-border tw-border-gray-300 tw-rounded tw-px-2 tw-py-1">
                  <option>None</option>
                  <option>Approved</option>
                  <option>Unapproved</option>
                </select>
              </div>
              <div>
                <label className="tw-mr-2">Shows:</label>
                <select className="tw-border tw-border-gray-300 tw-rounded tw-px-2 tw-py-1">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="tw-border tw-border-gray-400 focus:tw-outline-0 focus:tw-ring-1 focus:tw-ring-gray-300 tw-rounded-full tw-px-4 tw-py-1 tw-w-full sm:tw-w-auto"
              />
            </div>
          </div>

          {/* Table */}
          <table className="tw-min-w-full tw-bg-white tw-border tw-border-gray-300 tw-text-sm sm:tw-text-base">
            <thead>
              <tr className="tw-bg-gray-100">
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  #
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Drama
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Actors
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Genres
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Synopsis
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Status
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tw-bg-red-50">
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  1
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  [2024] Japan - Eye Love You
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  Takuya Kimura, Takeuchi Yuko, Neinen Reina
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  Romance, Adventures, Comedy
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  I love this drama. It taught me a lot about money and finance.
                  Love is not everything. We need to face the reality too. Being
                  stoic is the best.
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-red-600">
                  Unapproved
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  <a
                    href="#"
                    className="tw-text-red-600 hover:tw-underline"
                    onClick={() => handleEditClick("Eye Love You")}
                  >
                    Edit
                  </a>
                  <span className="tw-text-gray-500 tw-px-2">|</span>
                  <a href="#" className="tw-text-red-600 hover:tw-underline">
                    Delete
                  </a>
                </td>
              </tr>
              {/* Other rows */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-50 tw-p-4">
          <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-full tw-w-full md:tw-max-w-4xl lg:tw-max-w-5xl tw-relative tw-overflow-y-auto tw-max-h-screen">
            {/* Close Button */}
            <button
              className="tw-absolute tw-top-2 tw-right-2 tw-bg-red-600 tw-text-white tw-px-3 tw-py-1 tw-rounded-lg tw-text-lg hover:tw-bg-red-700 focus:tw-outline-none"
              onClick={handleCloseModal}
            >
              X
            </button>

            {/* Approve and Delete Buttons in the Center */}
            <div className="tw-flex tw-justify-center tw-space-x-4 tw-mb-4">
              <button className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-green-600">
                Approve
              </button>
              <button className="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-red-600">
                Delete
              </button>
            </div>

            {/* Modal Content */}
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-space-y-4 md:tw-space-y-0 md:tw-space-x-4">
              {/* Image Section */}
              <div className="tw-w-full md:tw-w-1/3 tw-mb-4 md:tw-mb-0">
                <div className="tw-w-full tw-h-64 tw-bg-gray-300 tw-rounded-lg"></div>
              </div>

              {/* Text Information Section */}
              <div className="tw-flex-grow">
                <h2 className="tw-text-2xl tw-font-bold">
                  Title of the drama that makes two lines
                </h2>
                <p className="tw-text-gray-500">
                  Other title: Title 2, Title 3, Title 4
                </p>
                <p className="tw-text-gray-500">Year: Spring 2024</p>
                <p className="tw-mt-4">
                  Synopsis sometimes unhelpful. I don't need it thoroughly. But
                  what helps me is the genres. I need to see genres and actors.
                  That is what I want.
                </p>
                <p className="tw-mt-4">Genre 1, Genre 2, Genre 3</p>
                <p className="tw-mt-2">Rating: 3.95/5</p>
                <p className="tw-mt-2">Availability: Fansub @subscl on X</p>
              </div>
            </div>

            {/* Actor Images Section */}
            <div className="tw-mt-4 tw-flex tw-space-x-4 tw-overflow-x-auto">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="tw-flex tw-flex-col tw-items-center"
                >
                  <div className="tw-w-24 tw-h-24 tw-bg-gray-300 tw-rounded tw-mb-2"></div>
                  <p>Actor {index + 1}</p>
                </div>
              ))}
            </div>

            {/* Trailer Section */}
            <div className="tw-mt-4">
              <div className="tw-w-full tw-h-48 tw-bg-gray-300 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                <div className="tw-w-16 tw-h-16 tw-bg-gray-500 tw-triangle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Show;
