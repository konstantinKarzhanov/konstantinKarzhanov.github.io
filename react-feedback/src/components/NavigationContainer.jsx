import React from "react";
import { NavLink } from "react-router-dom";
import "./css/nav.css";

const NavigationContainer = () => {
  const navigationArr = ["home", "feedback", "about", "contact"];
  return (
    <header className="container--py">
      <nav>
        <ul className="flex flex--gap text-capital fw--400">
          {navigationArr.map((item, index) => (
            <li key={index}>
              <NavLink to={item}>{item}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationContainer;
