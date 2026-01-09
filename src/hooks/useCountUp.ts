import { useEffect, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
  decimals?: number;
}

/**
 * Hook for animating a number from start to end value.
 * Respects prefers-reduced-motion automatically.
 */
export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  enabled = true,
  decimals = 1,
}: UseCountUpOptions): string {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const difference = end - start;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: linear growth from 0 to 60, then deceleration phases
      let easedProgress: number;
      
      // Value 60 represents ~91.2% of 65.8, value 65 represents ~98.8% of 65.8
      const linearEnd = 60 / end;
      const slowDecelStart = 65 / end;
      
      if (progress <= linearEnd) {
        // Linear growth from 0 to 60 (uniform speed)
        easedProgress = progress;
      } else if (progress <= slowDecelStart) {
        // First deceleration phase: 60 to 65 (moderate slowdown)
        const t = (progress - linearEnd) / (slowDecelStart - linearEnd);
        easedProgress = linearEnd + (1 - Math.pow(1 - t, 4)) * (slowDecelStart - linearEnd);
      } else {
        // Final deceleration phase: 65 to 65.8 (very slow final approach)
        const t = (progress - slowDecelStart) / (1 - slowDecelStart);
        // Use very high exponent for extremely slow final approach
        easedProgress = slowDecelStart + (1 - Math.pow(1 - t, 10)) * (1 - slowDecelStart);
      }
      
      const current = start + difference * easedProgress;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, start, enabled, decimals]);

  return count.toFixed(decimals);
}
