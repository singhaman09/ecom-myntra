import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 1.2,
    });

    const ignoreScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      const shouldIgnore = target.closest(".scroll-ignore");
      if (shouldIgnore) {
        e.stopImmediatePropagation(); // prevent Lenis from handling this event
      }
    };

    window.addEventListener("wheel", ignoreScroll, true);
    window.addEventListener("touchstart", ignoreScroll, true);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener("wheel", ignoreScroll, true);
      window.removeEventListener("touchstart", ignoreScroll, true);
    };
  }, []);
};
