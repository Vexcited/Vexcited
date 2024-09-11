import type { ApplicationComponent } from "@/stores/desktop";

const LinksWindow: ApplicationComponent = (props) => {
  return (
    <div class="p-2 h-full">
      <iframe src="https://links.vexcited.com" class="w-full h-full rounded-md"
        classList={{
          "pointer-events-none": props.interacting || !props.active
        }}
      />
    </div>
  );
};

export default LinksWindow;
