import { createSignal, onCleanup, onMount } from "solid-js";
import front from "../assets/front-paralax.png";
import back from "../assets/back-paralax.png";

export default function ImageHero() {
  const [mouseX, setMouseX] = createSignal(0);
  const [mouseY, setMouseY] = createSignal(0);

  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMouseX(x);
    setMouseY(y);
  };

  onMount(() => {
    window.addEventListener("mousemove", handleMouseMove);
  });

  onCleanup(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div
      id="ImageHero"
      class="sticky top-0 z-0 inset-0 h-screen overflow-hidden"
    >
      <div
        style={{
          transform: `translate(${mouseX() * 10}px, ${mouseY() * 10}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <img
          id="ImageHeroImg"
          src={back}
          class="absolute inset-0 size-screen object-cover pointer-events-none scale-120"
        />
      </div>

      <div
        class="absolute inset-0 flex items-start pt-32 md:pt-0 md:items-center justify-center"
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
  );
}
