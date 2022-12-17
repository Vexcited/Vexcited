/* @refresh reload */
import "@fontsource/poppins";
import "@fontsource/fira-code";
import "virtual:windi.css";

import { render } from "solid-js/web";

import { onMount, onCleanup } from "solid-js";

import {
  startKeyboardListener,
  stopKeyboardListener,

  startScreenResizeListener,
  stopScreenResizeListener
} from "@/stores/remote";

// Components
import Desktop from "@/components/Desktop";

render(
  () => {
    onMount(() => {
      startKeyboardListener();
      startScreenResizeListener();
    });

    onCleanup(() => {
      stopKeyboardListener();
      stopScreenResizeListener();
    });

    return <Desktop />;
  },
  document.getElementById("root") as HTMLDivElement
);
