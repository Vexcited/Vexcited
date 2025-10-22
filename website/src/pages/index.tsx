import { createSignal, onMount, onCleanup } from "solid-js";
import back from "../assets/back-paralax.png";
import front from "../assets/front-paralax.png";
import { Motion } from "solid-motionone";
import LocomotiveScroll from "locomotive-scroll";

export default function View() {
  const [mouseX, setMouseX] = createSignal(0);
  const [mouseY, setMouseY] = createSignal(0);
  let scrollRef: HTMLDivElement | undefined;

  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMouseX(x);
    setMouseY(y);
  };

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);

    if (scrollRef) {
      const scroll = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.05,
          duration: 1.2,
        },
      });

      onCleanup(() => {
        scroll.destroy();
      });
    }
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div ref={scrollRef} data-scroll-container class="relative">
      {/* Hero Section */}
      <div class="h-screen relative overflow-hidden">
        <img
          src={back}
          class="absolute inset-0 size-screen object-cover pointer-events-none"
          style={{
            transform: `translate(${mouseX() * 10}px, ${
              mouseY() * 10
            }px) scale(1.05)`,
            transition: "transform 0.2s ease-out",
          }}
        />

        <div
          class="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${mouseX() * 15}px, ${mouseY() * 15}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <h1
            class="w-full text-center font-black italic text-white opacity-60"
            style={{ "font-size": "19vw" }}
          >
            VEXCITED
          </h1>
        </div>

        <img
          src={front}
          class="absolute inset-0 size-screen object-cover pointer-events-none"
          style={{
            transform: `translate(${mouseX() * 20}px, ${
              mouseY() * 20
            }px) scale(1.1)`,
            transition: "transform 0.2s ease-out",
          }}
        />
      </div>
    </div>
  );
}
