import React from "react";
import Logo from "../assets/logo.svg";

export default function Header () {
  return (
    <header
      className={`
        flex justify-between
        px-6 py-4
        fixed w-full top-0 
        bg-grey bg-opacity-40
        backdrop-blur
      `}
    >
      <a
        href="#"
        className="flex items-center gap-4"
      >
        <img
          alt="Vexcited's Logo"
          src={Logo}
          className="h-8 w-8"
        />
        <span>
          Mikkel RINGAUD
        </span>
      </a>
    </header>
  );
}
