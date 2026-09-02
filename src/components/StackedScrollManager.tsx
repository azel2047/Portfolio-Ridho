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

      sections.forEach((section, index) => {
        const nextSection = sections[index + 1];
        if (!nextSection) return;

        const innerContent = section.querySelector(".section-depth-target") || section;

        // Pin the section dynamically:
        // - If section is taller than viewport (e.g. Hero on mobile): wait until its bottom reaches viewport bottom so all content is revealed before pinning
        // - If section fits inside viewport: pin at "top top"
        ScrollTrigger.create({
          trigger: section,
          start: () => {
            const isTall = section.offsetHeight > window.innerHeight;
            return isTall ? "bottom bottom" : "top top";
          },
          endTrigger: nextSection,
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Depth perspective effect as next section slides over this section
        gsap.to(innerContent, {
          scrollTrigger: {
            trigger: nextSection,
            start: () => {
              const isTall = section.offsetHeight > window.innerHeight;
              return isTall ? "bottom bottom" : "top bottom";
            },
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
          scale: 0.96,
          opacity: 0.9,
          y: -15,
          ease: "none",
          transformOrigin: "center top",
        });
      });
    });

    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleRefresh);
    window.addEventListener("resize", handleRefresh);

    return () => {
      window.removeEventListener("load", handleRefresh);
      window.removeEventListener("resize", handleRefresh);
      ctx.revert();
    };
  }, []);

  return null;
}
