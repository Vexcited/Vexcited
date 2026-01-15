/* @refresh reload */
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/900-italic.css";
import "@fontsource/poppins/900.css";
import "@fontsource/fira-code";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { render } from "solid-js/web";
import Home from "./pages/index";

render(() => <Home />, document.getElementById("root") as HTMLDivElement);
