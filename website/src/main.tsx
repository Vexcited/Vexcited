/* @refresh reload */
import "@fontsource/poppins";
import "@fontsource/poppins/900-italic.css";
import "@fontsource/poppins/900.css";
import "@fontsource/fira-code";
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { render } from "solid-js/web";
import Home from "./pages/index";

render(() => <Home />, document.getElementById("root") as HTMLDivElement);
