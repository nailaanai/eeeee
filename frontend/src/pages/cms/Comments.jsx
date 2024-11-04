import React from "react";

const Comments = () => {
  return (
    <div className="tw-px-4 tw-flex tw-flex-col tw-justify-start tw-items-center tw-bg-gray-100 tw-min-h-screen tw-w-full">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-w-full tw-mx-4 sm:tw-mx-6 lg:tw-max-w-6xl lg:tw-mx-auto tw-my-4">
        <div className="tw-overflow-x-auto tw-p-4">
          <div className="tw-mb-2">
            <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
              Page Comments
            </h2>
          </div>
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

          <table className="tw-min-w-full tw-bg-white tw-border tw-border-gray-300 tw-text-sm sm:tw-text-base">
            <thead>
              <tr className="tw-bg-gray-100">
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Username
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Rate
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Drama
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Comments
                </th>
                <th className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tw-bg-red-50">
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  <input type="checkbox" /> Nara
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  <span className="tw-text-red-600">★★★★★</span>
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  [2024] Japan - Eye Love You
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  I love this drama. It taught me a lot about money and finance.
                  Love is not everything. We need to face the reality too. Being
                  stoic is the best.
                  <br />
                  <br />
                  What the most thing that I love is about the kindness. Having
                  money is perfect.
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-red-600">
                  Unapproved
                </td>
              </tr>
              <tr>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  <input type="checkbox" /> Luffy
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  <span className="tw-text-red-600">★★</span>
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  [2024] Japan - Eye Love You
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300">
                  Meh
                </td>
                <td className="tw-px-4 tw-py-2 tw-border-b tw-border-gray-300 tw-text-green-600">
                  Approved
                </td>
              </tr>
            </tbody>
          </table>

          <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-center tw-mt-4 tw-space-y-4 sm:tw-space-y-0">
            <div>
              <a href="#" className="tw-text-red-600 hover:tw-underline">
                Select All
              </a>
            </div>
            <div className="tw-flex tw-space-x-2">
              <button>
                <a
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-green-600 tw-py-2 tw-px-6 tw-font-dm tw-text-base tw-font-medium tw-text-white tw-shadow-xl tw-shadow-green-100/75 tw-transition-transform tw-duration-200 tw-ease-in-out hover:tw-scale-[1.02]"
                  href="#"
                >
                  Approved
                </a>
              </button>
              <button>
                <a
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-red-600 tw-py-2 tw-px-6 tw-font-dm tw-text-base tw-font-medium tw-text-white tw-shadow-xl tw-shadow-green-100/75 tw-transition-transform tw-duration-200 tw-ease-in-out hover:tw-scale-[1.02]"
                  href="#"
                >
                  Submit
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
