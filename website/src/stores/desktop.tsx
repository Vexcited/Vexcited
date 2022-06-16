import type { DesktopItemType } from "@/components/DesktopItem";

import { createStore } from "solid-js/store";
import { AiFillMessage } from "solid-icons/ai";

export const defaultDesktopItems: DesktopItemType[] = [
  {
    name: "Contact",
    icon: <AiFillMessage size={"100%"}/>,
    action: () => setWindowsState({ "contact": {
      open: true
    }})
  }
];

export const [desktopItems, setDesktopItems] = createStore<DesktopItemType[]>(defaultDesktopItems);

export const [windowsState, setWindowsState] = createStore({});
