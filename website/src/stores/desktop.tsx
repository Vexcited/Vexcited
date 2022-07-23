import type { JSX } from "solid-js";

import { createStore } from "solid-js/store";
import { AiFillMessage } from "solid-icons/ai";

export interface DesktopItem {
  /** Identifier, *like an executable name*. */
  id: string;
  name: string;
  icon: JSX.Element;
  start_action: () => unknown;
}

/** Default items on the desktop when "booting". */
export const defaultDesktopItems: DesktopItem[] = [
  {
    id: "contact",
    name: "Contact",
    icon: <AiFillMessage size={"100%"}/>,
    start_action: () => {
      setOpenedWindows(
        draft => [...draft,
          {
            desktopItemId: "contact",
            isMaximized: false,
            isMinimized: false,
            position: {
              x: 0,
              y: 0
            }
          }
        ]
      );
    }
  }
];

export const [desktopItems, setDesktopItems] = createStore<DesktopItem[]>(defaultDesktopItems);

export interface OpenedWindow {
  desktopItemId: string;
  
  isMaximized: boolean;
  isMinimized: boolean;
  
  position: {
    x: number,
    y: number
  };
}

/** Returns an empty array if no window is opened. */
export const [openedWindows, setOpenedWindows] = createStore<OpenedWindow[]>([]);
