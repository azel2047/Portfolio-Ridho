"use client";

import { useEffect, useRef } from "react";
import { Layout, Server, Palette, Wrench } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Staggered categories reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      if (gridRef.current) {
        tl.from(
          gridRef.current.children,
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

      if (toolsRef.current) {
        tl.from(
          toolsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.2"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      title: "Frontend Engineering",
      color: "bg-yellow",
      icon: Layout,
      desc: "Fast, accessible, and responsive user interfaces with modern component architectures and state systems.",
      skills: [
        "React 19",
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "HTML5 / CSS3",
        "State Mgmt",
        "Responsive UI",
      ],
    },
    {
      title: "Backend & Cloud",
      color: "bg-green",
      icon: Server,
      desc: "Developing reliable RESTful APIs, scalable database models, and secure server-side infrastructure.",
      skills: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "REST APIs",
        "Prisma ORM",
        "JWT Auth",
        "Cloud Deploy",
      ],
    },
    {
      title: "UI/UX & Creative",
      color: "bg-pink",
      icon: Palette,
      desc: "Designing intuitive wireframes, responsive design systems, interactive prototypes, and micro-interactions.",
      skills: [
        "Figma",
        "Design Systems",
        "Wireframing",
        "Micro-interactions",
        "Design Tokens",
        "Visual Design",
        "Accessibility",
      ],
    },
  ];

  const tools = [
    "Git & GitHub",
    "VS Code",
    "Postman",
    "Vite",
    "Docker Basics",
    "Linux / Bash",
    "npm / pnpm",
    "Vercel",
  ];

  return (
    <section
      ref={sectionRef}
      className="stacked-section stacked-panel-skills flex flex-col justify-center"
      id="skills"
      style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}
    >
      <div ref={contentRef} className="container-main section-depth-target">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            {/* <div className="mb-3 inline-flex items-center gap-2 border-2 border-border bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-black shadow-[2px_2px_0_#09090b]">
              <span>02</span>
              <span>/</span>
              <span>Capabilities</span>
            </div> */}
            <h2
              className="font-heading font-black uppercase tracking-tight leading-[1.1] text-black"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
            >
              Skills &amp;{" "}
              <span className="inline-block border-2 border-border bg-yellow px-2.5 py-0.5 shadow-[3px_3px_0_#09090b] -rotate-1">
                Toolkit
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
            Continuous exploration is at the core of my workflow. Here are the core technologies 
            and design tools I utilize to craft digital products.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="neo-card group flex flex-col justify-between p-5 sm:p-6 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b]"
              >
                <div>
                  {/* Card Top */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border-2 border-border ${cat.color} text-black shadow-[2px_2px_0_#09090b] transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6`}>
                      <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <span className="border border-border bg-[#ece8e1] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black shadow-[1px_1px_0_#09090b]">
                      {cat.skills.length} Skills
                    </span>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-black mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5 font-medium">
                    {cat.desc}
                  </p>
                </div>

                {/* Skills Badges */}
                <div className="border-t-2 border-border pt-3.5 mt-auto">
                  <div className="text-[10px] font-black uppercase tracking-wider text-text-secondary mb-2">
                    Core Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center border border-border bg-white px-2 py-0.5 text-[11px] font-bold text-black transition-all duration-150 hover:bg-black hover:text-white hover:scale-105"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow & Tooling Bar with explicit marginTop */}
        <div
          ref={toolsRef}
          className="border-2 border-border bg-white p-4 sm:p-5 shadow-[3px_3px_0_#09090b]"
          style={{ marginTop: "2.5rem" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-heading text-xs font-black uppercase tracking-wider text-black shrink-0">
              <div className="flex h-6 w-6 items-center justify-center border border-border bg-pink shadow-[1px_1px_0_#09090b]">
                <Wrench className="h-3.5 w-3.5 text-black" />
              </div>
              <span>Dev Environment &amp; Tools:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="border border-border bg-[#ece8e1] px-2.5 py-1 text-[11px] font-bold text-black transition-all duration-150 hover:bg-black hover:text-white hover:scale-105"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
