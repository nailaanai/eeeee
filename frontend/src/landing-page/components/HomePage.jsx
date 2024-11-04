import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "../../style/Home.css";
import "../../style/landingpage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import MovieCard from "./MovieCard";
import Footer from "./footer/Footer.jsx";
import NavigationBar from "./NavigationBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [show, setShow] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, settopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  const navigate = useNavigate();

  const handlePlay = (url) => {
    const embedUrl = url.replace("watch?v=", "embed/");
    setVideoUrl(embedUrl);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setVideoUrl("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <FaArrowLeft className="slick-prev" />, 
    nextArrow: <FaArrowRight className="slick-next" />,
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/landing/movies/popular');
        const data = await res.json();
        if (data.length) {
          setPopularMovies(data);
        } else {
          console.log("No popular movies found.");
        }
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/landing/movies/top_rated');
        const data = await res.json();
        if (data.length) {
          settopRatedMovies(data);
        } else {
          console.log("No topRated movies found.");
        }
      } catch (err) {
        console.error("Failed to fetch top rated movies:", err);
      }
    };

    fetchTopMovies();
  }, []);

  useEffect(() => {
    const fetchUpCoMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/landing/movies/upcoming');
        const data = await res.json();
        if (data.length) {
          setUpcomingMovies(data);
        } else {
          console.log("No upcoming movies found.");
        }
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err);
      }
    };

    fetchUpCoMovies();
  }, []);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const res = await fetch('http://localhost:5000/landing/movies/top_movie');
        const data = await res.json();
        console.log("Top Movies Data:", data);
        setTopMovies(data);
      } catch (err) {
        console.error("Failed to fetch top movies:", err);
      }
    };    
    fetchTopMovies();
  }, []);
  
  return (
    <>
    <NavigationBar />
    <div className="slider-area bg-black">
      <div className="md:container mx-auto p-0">
        <Slider {...settings}>
          {topMovies && topMovies.length > 0 ? (
            topMovies.map((movie) => (
              <div key={movie.id} className="single-slider">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="img-fluid"
                />
                <div className="slider-overlay">
                  <div className="slider-content">
                    <h1 className="title text-white">{movie.title}</h1>
                    <div className="sub-title text-gray-300">
                      {movie.year || "Year not available"}
                      {" || "}
                      {Array.isArray(movie.genres) && movie.genres.length > 0
                        ? movie.genres.join(", ")
                        : "Genres not available"}
                      {" || "}
                      {Array.isArray(movie.countries) && movie.countries.length > 0
                        ? movie.countries.join(", ")
                        : "Countries not available"}
                      {" || "}
                      {movie.rating || "Rating not available"}
                    </div>
                    <button 
                        className="play-button"
                        onClick={() => handlePlay(movie.trailer)}
                    >
                        <FaPlay className="mr-2" /> Play
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No movies to display</p>
          )}
        </Slider>

        {/* Modal untuk menampilkan video trailer */}
        {show && (
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={handleClose}>Close</button>
                    <iframe
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        )}

        <MovieCard title={"Popular"} movies={popularMovies} />
        <div className="see-more">
            <Link to="/all-movies?category=popular" className="see-more-button">
                See More
            </Link>
        </div>
        <MovieCard title={"Top Rated"} movies={topratedMovies} />
        <div className="see-more">
          <Link to="/all-movies?category=top_rated" className="see-more-button">
            See More
          </Link>
        </div>
        <MovieCard title={"Upcoming"} movies={upcomingMovies} />
        <div className="see-more">
          <Link to="/all-movies?category=upcoming" className="see-more-button">
            See More
          </Link>
        </div>
        <Footer/>
      </div>
    </div>
    </>
  );
};

export default HomePage;
