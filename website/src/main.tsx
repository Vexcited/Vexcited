import ReactDOM from "react-dom";
import React from "react";

// Poppins
import "@fontsource/poppins";

// Tailwind CSS
import "tailwindcss/tailwind.css";

// Assets
import Logo from "./assets/logo.svg";
import { BsInstagram, BsGithub, BsYoutube } from "react-icons/bs";

type IconLinkProps = {
  icon: React.ReactNode;
  title: string;
  link: string;
};

const IconLink = ({ icon, title, link }: IconLinkProps) => {
  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      href={link}
      title={title}
      className="text-blue text-opacity-60 hover:text-blue-light hover:text-opacity-100 transition"
    >
      {icon}
    </a>
  );
}

ReactDOM.render(
	<React.StrictMode>
    <section className="h-screen flex flex-col items-center justify-center">
      <img className="mb-2 h-32 w-32 drop-shadow-xl drop-shadow-white" alt="Logo de Vexcited" src={Logo} />

      <h1 className="font-bold text-xl">Vexcited</h1>
      <span className="font-medium text-md">Mikkel RINGAUD</span>

      <p className="flex gap-2 mb-6 mt-2">
        <IconLink
          icon={<BsYoutube size={18} />}
          title="YouTube"
          link="https://youtube.com/channel/UCFJ__5HnvYEyaVkNuvUy4NQ"
        />
        <IconLink
          icon={<BsGithub size={18} />}
          title="GitHub"
          link="https://github.com/Vexcited"
        />
        <IconLink
          icon={<BsInstagram size={18} />}
          title="Instagram"
          link="https://instagram.com/vexcitedoff"
        />
      </p>

      <a 
        href="https://diligent-fahrenheit-2ed.notion.site/Curriculum-Vitae-dc93876cc7dc41f8af1d8e425514f211"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-2 rounded bg-gradient-to-bl font-bold from-blue-light to-blue-dark text-white shadow hover:shadow-xl transition"
      >
        CV
      </a>
    </section>
	</React.StrictMode>,
	document.getElementById("root")
);
