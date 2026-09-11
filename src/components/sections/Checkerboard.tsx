"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Checkerboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (containerRef.current && marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
          x: -120,
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = [
    "Full-Stack Web Apps",
    "Interaction & UI/UX Design",
    "Next.js & React Ecosystem",
    "Creative Computing",
    "Clean & Scalable Code",
    "Performance & SEO Focused",
    "Modern Web APIs",
    "User-Centered Detail",
  ];

  return (
    <div
      ref={containerRef}
      className="overflow-hidden border-b-2 border-border bg-black py-3 select-none"
      aria-hidden="true"
    >
      <div
        ref={marqueeRef}
        className="flex w-max animate-[marqueeLeft_30s_linear_infinite] hover:[animation-play-state:paused]"
      >
        {/* Sequence 1 */}
        <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
          {items.map((item, i) => (
            <span
              key={i}
              className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Sequence 2 for seamless infinite loop */}
        <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
          {items.map((item, i) => (
            <span
              key={`dup-${i}`}
              className="font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
