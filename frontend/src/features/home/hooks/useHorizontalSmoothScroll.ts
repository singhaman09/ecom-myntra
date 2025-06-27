import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface HorizontalScrollOptions {
  speedMultiplier?: number;
  duration?: number;
  ease?: string;
  throttleDelay?: number;
}

export const useHorizontalSmoothScroll = (
  containerRef: React.RefObject<HTMLElement>,
  options?: HorizontalScrollOptions
) => {
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const throttledScroll = useCallback((callback: () => void, delay: number) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current >= delay) {
      lastScrollTimeRef.current = now;
      callback();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const speed = options?.speedMultiplier ?? 1.2;
    const duration = options?.duration ?? 0.6;
    const ease = options?.ease ?? "power2.out";
    const throttleDelay = options?.throttleDelay ?? 16; // ~60fps

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      throttledScroll(() => {
        // Kill any existing animation to prevent conflicts
        if (animationRef.current) {
          animationRef.current.kill();
        }

        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        const scrollAmount = delta * speed;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Calculate target scroll with bounds checking
        let targetScroll = currentScroll + scrollAmount;
        targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

        // Only animate if there's a meaningful difference
        if (Math.abs(targetScroll - currentScroll) > 1) {
          isScrollingRef.current = true;
          
          animationRef.current = gsap.to(container, {
            scrollTo: { x: targetScroll },
            duration,
            ease,
            onComplete: () => {
              isScrollingRef.current = false;
              animationRef.current = null;
            },
            overwrite: true, // Automatically overwrite conflicting tweens
          });
        }
      }, throttleDelay);
    };

    // Use more specific event options for better performance
    const eventOptions = { 
      passive: false, 
      capture: false 
    };

    container.addEventListener("wheel", handleWheel, eventOptions);

    // Cleanup function
    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      isScrollingRef.current = false;
    };
  }, [containerRef, options, throttledScroll]);

  // Return useful state/methods if needed
  return {
    isScrolling: isScrollingRef.current,
    stopScrolling: () => {
      if (animationRef.current) {
        animationRef.current.kill();
        isScrollingRef.current = false;
      }
    }
  };
};