import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import NavigationContainer from "./components/NavigationContainer";
import FooterContainer from "./components/FooterContainer";

// pages
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <NavigationContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <FooterContainer />
    </>
  );
};

export default App;
