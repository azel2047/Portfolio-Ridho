"use client";

import { useEffect, useRef } from "react";
import { Zap, Sparkles, Code2, Rocket, Palette, Terminal, ShieldCheck, Heart } from "lucide-react";
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
    { text: "Full-Stack Web Apps", icon: Zap },
    { text: "Interaction & UI/UX Design", icon: Palette },
    { text: "Next.js & React Ecosystem", icon: Rocket },
    { text: "Creative Computing", icon: Sparkles },
    { text: "Clean & Scalable Code", icon: Code2 },
    { text: "Performance & SEO Focused", icon: ShieldCheck },
    { text: "Modern Web APIs", icon: Terminal },
    { text: "User-Centered Detail", icon: Heart },
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
        <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <span
                key={i}
                className="flex items-center gap-2 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
              >
                <Icon className="h-3.5 w-3.5 text-yellow" />
                <span>{item.text}</span>
                <span className="text-pink ml-2">✦</span>
              </span>
            );
          })}
        </div>

        {/* Sequence 2 for seamless infinite loop */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <span
                key={`dup-${i}`}
                className="flex items-center gap-2 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
              >
                <Icon className="h-3.5 w-3.5 text-yellow" />
                <span>{item.text}</span>
                <span className="text-pink ml-2">✦</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
