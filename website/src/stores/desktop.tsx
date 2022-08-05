import type { IconTypes } from "solid-icons";

import { createStore } from "solid-js/store";
import { AiFillMessage } from "solid-icons/ai";

export interface DesktopItem {
  /** Identifier, like an executable name. */
  id: string;
  name: string;
  icon: IconTypes;
  start_action: () => unknown;
}

export const defaultDesktopItems: DesktopItem[] = [
  {
    id: "contact",
    name: "Contact",
    icon: AiFillMessage,
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
