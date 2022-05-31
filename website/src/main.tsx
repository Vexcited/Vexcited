/* @refresh reload */
import "@fontsource/poppins";
import "@fontsource/fira-code";
/** WindiCSS */ import "windi.css";

import { render } from "solid-js/web";

// Components
import Header from "@/components/Header";
import MainHero from "@/components/MainHero";
import AboutMe from "@/components/AboutMe";

render(
  () => <>
    <Header />
    <MainHero />
    <AboutMe />
  </>,
  document.getElementById("root") as HTMLDivElement
);
