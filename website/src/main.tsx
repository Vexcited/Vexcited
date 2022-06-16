/* @refresh reload */
import "@fontsource/poppins";
import "@fontsource/fira-code";
/** WindiCSS */ import "virtual:windi.css";

import { render } from "solid-js/web";

// Components
import Desktop from "@/components/Desktop";

render(
  () => <>
  <Desktop />
  </>,
  document.getElementById("root") as HTMLDivElement
);
