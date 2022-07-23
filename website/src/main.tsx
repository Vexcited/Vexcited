/* @refresh reload */
import "@fontsource/poppins";
import "@fontsource/fira-code";
import "virtual:windi.css";

import { render } from "solid-js/web";
import {} from "solid-js";

// Components
import Desktop from "@/components/Desktop";

render(
  () => <Desktop />,
  document.getElementById("root") as HTMLDivElement
);
