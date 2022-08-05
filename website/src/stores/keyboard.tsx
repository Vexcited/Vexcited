import { createStore } from "solid-js/store";

export const [keyboard, setKeyboard] = createStore({
  shift: false,
  meta: false,
  ctrl: false,
  alt: false
});

const keyHandler = (event: KeyboardEvent) => setKeyboard({
  shift: event.shiftKey,
  meta: event.metaKey,
  ctrl: event.ctrlKey,
  alt: event.altKey
});

export const startKeyboardListener = () => {
  window.addEventListener("keydown", keyHandler);
  window.addEventListener("keyup", keyHandler);
};

export const stopKeyboardListener = () => {
  window.removeEventListener("keydown", keyHandler);
  window.removeEventListener("keyup", keyHandler);
};
