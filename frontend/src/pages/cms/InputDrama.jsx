import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const InputDrama = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [genresOptions, setGenresOptions] = useState([]);
  const [actorsOptions, setActorsOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [altTitle, setAltTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [year, setYear] = useState("");
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/countries");
        const countryOptions = response.data.countries.map((country) => ({
          value: country.id,
          label: country.name,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/genres");
        setGenresOptions(response.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/actors");
        const actorOptions = response.data.actors.map((actor) => ({
          value: actor.id,
          label: actor.name,
          photo: actor.profile_path.startsWith("uploads")
            ? `http://localhost:5000/${actor.profile_path}`
            : actor.profile_path,
        }));
        setActorsOptions(actorOptions);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };
    fetchActors();
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleActorSelect = (selected) => {
    setSelectedActors(selected);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("alt_title", altTitle);
    formData.append("synopsis", synopsis);
    formData.append("year", year);
    formData.append("trailer", trailer);
    formData.append(
      "country_id",
      selectedCountry ? selectedCountry.value : null
    );
    formData.append("genres", JSON.stringify(selectedGenres));
    formData.append(
      "actors",
      JSON.stringify(selectedActors.map((actor) => actor.value))
    );

    if (uploadedImage) {
      formData.append("poster", uploadedImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/movies",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Movie created:", response.data);
      alert("Movie created successfully!");

      // Reset all fields after successful submit
      setTitle("");
      setAltTitle("");
      setSynopsis("");
      setYear("");
      setTrailer("");
      setSelectedCountry(null);
      setSelectedGenres([]);
      setSelectedActors([]);
      setUploadedImage(null);

      console.log("Form fields reset to default values.");
    } catch (error) {
      console.error("Error creating movie:", error);
      alert("Failed to create movie");
    }
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#D1D5DB" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 2px rgba(156, 163, 175, 0.5)" : null,
      outline: "0",
      "&:hover": {
        borderColor: "#D1D5DB",
      },
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflowY: "auto",
    }),
  };

  return (
    <div className="tw-px-4 tw-flex tw-flex-col tw-justify-start tw-items-center tw-bg-gray-100 tw-min-h-screen tw-w-full">
      <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden tw-w-full tw-max-w-7xl tw-mx-4 sm:tw-mx-6 lg:tw-mx-auto tw-my-4">
        <div className="tw-p-4">
          <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-2">
            Page Input Drama
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-space-y-4 sm:tw-space-y-0 sm:tw-space-x-4">
              {/* Left Column: Submit Button and Image Upload */}
              <div className="tw-flex tw-flex-col tw-items-center">
                <div
                  className="tw-max-w-xs tw-mb-2"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {!uploadedImage ? (
                    <label className="tw-flex tw-justify-center tw-w-48 tw-h-32 tw-px-4 tw-transition tw-bg-white tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-md tw-appearance-none tw-cursor-pointer hover:tw-border-gray-400 focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300">
                      <span className="tw-flex tw-items-center tw-space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="tw-w-10 tw-h-10 tw-text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <div className="tw-font-medium tw-block tw-text-gray-600">
                          Drop files to Attach
                        </div>
                      </span>
                      <input
                        type="file"
                        name="file_upload"
                        className="tw-hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  ) : (
                    <div className="tw-relative">
                      <img
                        src={URL.createObjectURL(uploadedImage)}
                        alt="Preview"
                        className="tw-w-48 tw-h-32 tw-object-cover tw-rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="tw-absolute tw-top-2 tw-right-2 tw-bg-red-500 tw-text-white tw-rounded-full tw-w-6 tw-h-6 tw-flex tw-items-center tw-justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="tw-inline-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-green-600 tw-py-2 tw-px-6 tw-font-dm tw-text-base tw-font-medium tw-text-white tw-shadow-xl tw-shadow-green-100/75 tw-transition-transform tw-duration-200 tw-ease-in-out hover:tw-scale-[1.02] tw-mt-2"
                >
                  Submit
                </button>
              </div>

              {/* Right Column: Input Fields */}
              <div className="tw-flex-grow">
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
                    />
                  </div>
                  <div>
                    <label>Alternative Title</label>
                    <input
                      type="text"
                      placeholder="Enter alternative title"
                      value={altTitle}
                      onChange={(e) => setAltTitle(e.target.value)}
                      className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
                    />
                  </div>
                  <div>
                    <label>Year</label>
                    <input
                      type="text"
                      placeholder="Enter year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
                    />
                  </div>
                  <div>
                    <label>Country</label>
                    <Select
                      options={countries}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                      placeholder="Select Country"
                      isSearchable
                      styles={customStyles}
                      className="tw-w-full"
                    />
                  </div>
                  <div className="tw-col-span-2">
                    <label>Synopsis</label>
                    <textarea
                      placeholder="Enter synopsis"
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                {/* Genres */}
                <div className="tw-mt-4">
                  <label>Add Genres</label>
                  <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-2">
                    {genresOptions.map((genre) => (
                      <div key={genre.id}>
                        <input
                          type="checkbox"
                          id={`genre-${genre.id}`}
                          value={genre.id}
                          checked={selectedGenres.includes(genre.id)}
                          onChange={() => handleGenreChange(genre.id)}
                          className="focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
                        />
                        <label
                          htmlFor={`genre-${genre.id}`}
                          className="tw-ml-2"
                        >
                          {genre.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actors */}
                <div className="tw-mt-4">
                  <label>Add Actors (Select up to 9)</label>
                  <Select
                    options={actorsOptions}
                    isMulti
                    value={selectedActors}
                    onChange={handleActorSelect}
                    placeholder="Select Actors"
                    styles={customStyles}
                    className="tw-w-full"
                  />
                  <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-4 tw-mt-4">
                    {selectedActors.map((actor) => (
                      <div
                        key={actor.value}
                        className="tw-relative tw-flex tw-flex-col tw-items-center"
                      >
                        <img
                          src={actor.photo}
                          alt={actor.label}
                          className="tw-w-20 tw-h-24 tw-rounded tw-mb-2"
                        />
                        <span className="tw-w-full tw-text-center">
                          {actor.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trailer Link */}
                <div className="tw-mt-4">
                  <label>Link Trailer</label>
                  <input
                    type="text"
                    placeholder="Enter trailer link"
                    value={trailer}
                    onChange={(e) => setTrailer(e.target.value)}
                    className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 focus:tw-outline-0 focus:tw-ring-2 focus:tw-ring-gray-300"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputDrama;
