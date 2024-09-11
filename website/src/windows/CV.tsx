import type { ApplicationComponent } from "@/stores/desktop";

const CVWindow: ApplicationComponent = (props) => {
  return (
    <div class="p-2 h-full">
      <iframe src="/cv.pdf" class="w-full h-full rounded-md"
        classList={{
          "pointer-events-none": props.interacting || !props.active
        }}
      />
    </div>
  );
};

export default CVWindow;
