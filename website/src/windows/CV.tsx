import type { Component } from "solid-js";

const CVWindow: Component = () => {
  return (
    <iframe src="/cv.pdf" class="w-full h-full" />
  );
};

export default CVWindow;
