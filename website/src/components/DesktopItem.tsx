import type { Component, JSX } from "solid-js";

export interface DesktopItemType {
  name: string;
  icon: JSX.Element;
  action: () => unknown;
}

const DesktopItem: Component<DesktopItemType> = (props) => {
  return (
    <div
      class="h-12 w-12 flex flex-col gap-2 items-center"
      onClick={() => props.action()}
    >
      <div class="hover:bg-grey-dark h-full">
        {props.icon}
      </div>

      <p>{props.name}</p>
    </div>
  );
};

export default DesktopItem;
