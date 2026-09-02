"use client";

import { useEffect, useRef } from "react";
import { Target, Zap, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Sub-elements staggered reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      if (cardsRef.current) {
        tl.from(
          cardsRef.current.children,
          {
            y: 25,
            opacity: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "transform,opacity",
          }
        );
      }

      if (pillarsRef.current) {
        tl.from(
          pillarsRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      title: "Purposeful Design",
      desc: "Every layout, button, and micro-interaction is designed with user empathy, visual clarity, and neo-brutalist precision.",
      icon: Target,
      bgColor: "bg-yellow",
    },
    {
      title: "Performance First",
      desc: "Lightweight, SEO-optimized, and accessible code delivering fast initial loads and fluid 60fps animations.",
      icon: Zap,
      bgColor: "bg-green",
    },
    {
      title: "Modern Engineering",
      desc: "Architecting modular, type-safe frontend systems using Next.js App Router, React 19, TypeScript, and clean APIs.",
      icon: Sparkles,
      bgColor: "bg-pink",
    },
  ];

  const highlights = [
    "Clean code & modular architecture",
    "Responsive across all screen sizes",
    "Accessibility & SEO best practices",
    "Interactive UI & micro-animations",
  ];

  return (
    <section
      ref={sectionRef}
      className="stacked-section stacked-panel-about flex flex-col justify-center"
      id="about"
      style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}
    >
      <div ref={contentRef} className="container-main section-depth-target">
        {/* Section Header */}
        <div ref={headerRef} className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            {/* <div className="mb-3 inline-flex items-center gap-2 border-2 border-border bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-black shadow-[2px_2px_0_#09090b]">
              <span>01</span>
              <span>/</span>
              <span>About Me</span>
            </div> */}
            <h2
              className="font-heading font-black uppercase leading-[1.1] tracking-tight text-black"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
            >
              More than{" "}
              <span className="inline-block border-2 border-border bg-green px-2.5 py-0.5 shadow-[3px_3px_0_#09090b] -rotate-1">
                just code.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
            Bridging technical precision with creative visual identity to create memorable web experiences.
          </p>
        </div>

        {/* 2-Column Main Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Bio & Standards */}
          <div className="neo-card group p-5 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b]">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-black mb-3">
                Crafting digital experiences with intent.
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5 font-medium">
                I&apos;m Ridho — an Informatics student and fullstack engineer based in Indonesia.
                I specialize in turning intricate technical problems into intuitive, responsive, and
                visually striking digital web applications.
              </p>
            </div>

            <div className="border-t-2 border-border pt-4 mt-auto">
              <div className="text-[11px] font-bold uppercase tracking-wider text-black mb-3">
                Core Standards:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {highlights.map((item, idx) => (
                  <div key={idx} className="group/item flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-primary">
                    <CheckCircle2 className="h-4 w-4 text-green shrink-0 fill-black stroke-green transition-transform duration-200 group-hover/item:scale-125" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Engineering Philosophy */}
          <div className="neo-card group p-5 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b]">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-black mb-3">
                Where design meets scalable architecture.
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 font-medium">
                I believe the most impactful products exist where{" "}
                <strong className="text-black bg-yellow/40 px-1 border-b-2 border-black">engineering</strong>,{" "}
                <strong className="text-black bg-green/40 px-1 border-b-2 border-black">design thinking</strong>, and{" "}
                <strong className="text-black bg-pink/40 px-1 border-b-2 border-black">creativity</strong> come together seamlessly.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                From architecting robust frontends with Next.js &amp; TypeScript to polishing micro-interactions and Figma prototypes, 
                every detail is optimized for speed, reliability, and human delight.
              </p>
            </div>

            <div className="pt-5 border-t-2 border-border mt-5 flex items-center justify-between">
              <a
                href="#skills"
                className="neo-btn bg-black px-4 py-2 text-xs text-white no-underline shadow-[3px_3px_0_#fde047] hover:shadow-[4px_4px_0_#fde047] transition-all duration-150 group/btn"
              >
                <span>Discover My Skillset</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>

              <span className="font-mono text-xs font-bold text-text-muted">
                01 / 05
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillar Feature Cards with explicit margin-top */}
        <div ref={pillarsRef} className="grid grid-cols-1 gap-5 md:grid-cols-3" style={{ marginTop: "2rem" }}>
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="neo-card group p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b]"
              >
                <div>
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center border-2 border-border ${item.bgColor} text-black shadow-[2px_2px_0_#09090b] transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-tight text-black mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
