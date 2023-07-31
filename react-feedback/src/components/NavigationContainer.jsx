import React from "react";
import { NavLink } from "react-router-dom";
import "./css/nav.css";

const NavigationContainer = () => {
  return (
    <header>
      <nav>
        <NavLink to="home">Home</NavLink>
        <NavLink to="feedback">Feedback</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact">Contact</NavLink>
      </nav>
    </header>
  );
};

export default NavigationContainer;
