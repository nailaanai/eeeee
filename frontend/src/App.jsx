import { Navigate, Route, Routes } from "react-router-dom";

import SignUpPage from "./pages/authentication/SignUpPage";
import LoginPage from "./pages/authentication/LoginPage";
import EmailVerificationPage from "./pages/authentication/EmailVerificationPage";
// import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";

//import Home from "./pages/cms/Home";
import Layout from "./components/cms/Layout";
import Show from "./pages/cms/Show";
import InputDrama from "./pages/cms/InputDrama";
import Countries from "./pages/cms/Countries";
import Genres from "./pages/cms/Genres";
import Actors from "./pages/cms/Actors";
import Comments from "./pages/cms/Comments";
import Users from "./pages/cms/Users";
//import "./App.css"

// Landing-page

// import Intro from './components/Intro';
import HomePage from "./landing-page/components/HomePage";
import DetailPage from "./landing-page/components/DetailPage";
import AllMovies from "./landing-page/components/AllMovie";
//import "./style/landingpage.css";
import "./style/Home.css";
import SearchPages from "./landing-page/components/SearchPages";
import "./style/navbar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import LoadingSpinner from "./components/authentication/LoadingSpinner";

import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


// protect routes that require authentication and admin role
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to email verification if the user is not verified
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  // Redirect to home page if the user is not an Admin
  if (user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  // Render the children components if all checks pass
  return children;
};



// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/search" element={<SearchPages />} />
        <Route path="/all-movies" element={<AllMovies />} />

        {/* CMS Routes - Only accessible by Admin */}
        <Route
          path="/cms"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Show />} />
          <Route path="/cms/input-drama" element={<InputDrama />} />
          <Route path="/cms/countries" element={<Countries />} />
          <Route path="/cms/genres" element={<Genres />} />
          <Route path="/cms/actors" element={<Actors />} />
          <Route path="/cms/comments" element={<Comments />} />
          <Route path="/cms/users" element={<Users />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
