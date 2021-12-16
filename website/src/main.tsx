import ReactDOM from "react-dom";
import React from "react";

// Fonts
import "@fontsource/poppins";
import "@fontsource/fira-code";

// Tailwind CSS
import "tailwindcss/tailwind.css";

// Components
import Header from "./components/Header";
import MainHero from "./components/MainHero";
import AboutMe from "./components/AboutMe";

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <MainHero />
    <AboutMe />
  </React.StrictMode>,
  document.getElementById("root")
);
