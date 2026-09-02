"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function StackedScrollManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".stacked-section");
      if (sections.length < 2) return;

      // Add subtle depth to each section as the next section moves over it
      sections.forEach((section, index) => {
        const nextSection = sections[index + 1];
        if (!nextSection) return;

        // Target the inner content of the section being covered
        const innerContent = section.querySelector(".section-depth-target") || section;

        gsap.to(innerContent, {
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
          scale: 0.98,
          opacity: 0.95,
          y: -10,
          ease: "none",
          transformOrigin: "center top",
        });
      });
    });

    // Refresh triggers after page assets load
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  return null;
}
