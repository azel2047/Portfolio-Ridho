"use client";

import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Timeline cards staggered in natural reading order
      if (timelineRef.current) {
        gsap.from(timelineRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          y: 25,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "all",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      period: "2024 — PRESENT",
      role: "Freelance Web Developer & UI Designer",
      org: "Self-Employed / Independent",
      type: "Contract / Project-Based",
      icon: Briefcase,
      badgeColor: "bg-green",
      desc: "Delivering custom high-performance web applications, responsive landing pages, and interactive UI prototypes for clients. Handling frontend architecture, API integrations, and SEO optimization.",
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "REST APIs"],
    },
    {
      period: "2023 — 2024",
      role: "UI/UX Design & Front-End Intern",
      org: "Creative Lab Studio",
      type: "Internship",
      icon: Briefcase,
      badgeColor: "bg-yellow",
      desc: "Collaborated with product teams to conduct usability research, create wireframes & design systems in Figma, and build accessible, responsive components for web products.",
      skills: ["Figma", "User Research", "Design Systems", "Prototyping", "HTML/CSS"],
    },
    {
      period: "2025 — PRESENT",
      role: "Informatics Engineering Student",
      org: "STT Terpadu Nurul Fikri",
      type: "Formal Education",
      icon: GraduationCap,
      badgeColor: "bg-pink",
      desc: "Actively developing my skills in programming, software engineering, and modern web technologies while managing freelance projects. Focused on building complex, scalable applications and continuous learning in AI and data engineering.",
      skills: ["Algorithms", "Data Structures", "System Architecture", "Team Collaboration"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="stacked-section stacked-panel-experience flex flex-col justify-center"
      id="experience"
      style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}
    >
      <div ref={contentRef} className="container-main section-depth-target">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            {/* <div className="mb-3 inline-flex items-center gap-2 border-2 border-border bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-black shadow-[2px_2px_0_#09090b]">
              <span>04</span>
              <span>/</span>
              <span>Career Track</span>
            </div> */}
            <h2
              className="font-heading font-black uppercase tracking-tight leading-[1.1] text-black"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
            >
              Journey &amp;{" "}
              <span className="inline-block border-2 border-border bg-green px-2.5 py-0.5 shadow-[3px_3px_0_#09090b] -rotate-1">
                Experience
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
            Key milestones, internships, and educational paths that have shaped 
            my development skills and engineering mindset.
          </p>
        </div>

        {/* Timeline Stack */}
        <div ref={timelineRef} className="flex flex-col gap-5">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="neo-card group p-5 sm:p-6 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b]"
              >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
                  {/* Left: Timeline Tag & Period */}
                  <div className="flex flex-col gap-2 lg:col-span-4">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center border-2 border-border ${item.badgeColor} text-black shadow-[2px_2px_0_#09090b] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black">
                        {item.period}
                      </span>
                    </div>

                    {/* Status Badge (Ping for Formal Education) */}
                    <span className="inline-flex self-start items-center gap-2 border border-border bg-[#ece8e1] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                        {item.type}

                        {item.type === "Formal Education" && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                          </span>
                        )}
                      </span>
                  </div>

                  {/* Right: Content & Description */}
                  <div className="flex flex-col gap-2.5 lg:col-span-8">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold uppercase tracking-tight text-black">
                        {item.role}
                      </h3>
                      <div className="font-mono text-xs font-bold text-text-secondary mt-0.5">
                        {item.org}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                      {item.desc}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {item.skills.map((s) => (
                        <span
                          key={s}
                          className="border border-border bg-white px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-black"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
