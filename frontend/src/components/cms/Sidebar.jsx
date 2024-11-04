import React, { useState } from "react";
import { FaLandmark, FaUser, FaComments } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { GiDramaMasks } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi2";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [isDramaOpen, setIsDramaOpen] = useState(false);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const SIDEBAR_LINKS = [
    {
      id: 1,
      path: "/cms",
      name: "Drama",
      icon: MdLocalMovies,
      subItems: [
        { id: 1.1, path: "/cms", name: "Show Drama" },
        { id: 1.2, path: "/cms/input-drama", name: "Input New Drama" },
      ],
    },
    { id: 2, path: "/cms/countries", name: "Countries", icon: FaLandmark },
    { id: 3, path: "/cms/genres", name: "Genres", icon: GiDramaMasks },
    { id: 4, path: "/cms/actors", name: "Actors", icon: HiUserGroup },
    { id: 5, path: "/cms/comments", name: "Comments", icon: FaComments },
    { id: 6, path: "/cms/users", name: "Users", icon: FaUser },
  ];


  return (
    <div className="tw-w-16 sm:tw-w-20 md:tw-w-56 lg:tw-w-64 tw-fixed tw-left-0 tw-top-0 tw-z-10 tw-h-screen tw-bg-white tw-border-r tw-pt-8 tw-px-2 md:tw-px-4 lg:tw-px-6">
      {/* Logo Section */}
      <div className="tw-flex tw-justify-center md:tw-justify-start tw-items-center">
        <img src="/public/logo.png" alt="Logo" className="tw-w-8 sm:tw-w-10 md:tw-w-12 lg:tw-w-20" />
        <h1 className="tw-font-bold tw-text-lg sm:tw-text-xl tw-hidden md:tw-flex lg:tw-text-2xl">
          THE FILMS
        </h1>
      </div>

      {/* Sidebar Links */}
      <ul className="tw-mt-4 tw-space-y-4 sm:tw-space-y-5 md:tw-space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li key={index}>
            <div
              className={`tw-font-medium tw-rounded-md tw-py-1 tw-px-3 sm:tw-px-4 lg:tw-px-5 hover:tw-bg-gray-100 hover:tw-text-red-500 tw-flex tw-justify-between tw-items-center ${
                activeLink === index ? "tw-bg-red-100 tw-text-red-500" : ""
              }`}
            >
              <Link
                to={link.path}
                className="tw-flex tw-justify-center md:tw-justify-start tw-items-center md:tw-space-x-5"
                onClick={() => {
                  handleLinkClick(index);
                  if (link.subItems) {
                    setIsDramaOpen(!isDramaOpen);
                  }
                }}
              >
                <span>{<link.icon size={20} sm={25} lg={30} />}</span>
                <span className="tw-text-sm sm:tw-text-base md:tw-text-m lg:tw-text-lg tw-text-gray-500 tw-hidden md:tw-flex tw-font-semibold">
                  {link.name}
                </span>
              </Link>
              {link.subItems && (
                <span
                  onClick={() => setIsDramaOpen(!isDramaOpen)}
                  className="tw-cursor-pointer"
                >
                  {isDramaOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              )}
            </div>

            {link.subItems && isDramaOpen && (
              <ul className="tw-ml-6 sm:tw-ml-8 tw-pl-4 tw-border-l tw-border-gray-300 tw-mt-2 tw-space-y-2">
                {link.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <Link
                      to={subItem.path}
                      className="tw-text-xs sm:tw-text-sm tw-text-gray-400 hover:tw-bg-gray-100 hover:tw-text-red-500 tw-block tw-rounded-md tw-py-2 tw-px-3 lg:tw-px-4"
                      onClick={() => handleLinkClick(index)}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Sidebar;
