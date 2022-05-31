import type { Component } from "solid-js";

import Logo from "@/assets/logo.svg";

const Header: Component = () => {
  return (
    <header
      class={`
        flex justify-between
        px-6 py-4
        fixed w-full top-0 
        bg-grey bg-opacity-40
        backdrop-blur
      `}
    >
      <a
        href="#intro"
        class="flex items-center gap-4"
      >
        <img
          alt="Vexcited's Logo"
          src={Logo}
          class="h-8 w-8"
        />
        <span>
          Mikkel RINGAUD
        </span>
      </a>

      <a
        href="#contact"
        class="px-6 py-4 bg-blue"
      >
        Me contacter
      </a>
    </header>
  );
};

export default Header;
