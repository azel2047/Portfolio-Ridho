"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, Mountain, Music, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: "14px", height: "14px", maxWidth: "14px", maxHeight: "14px", flexShrink: 0 }}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "webapp", label: "Web Apps" },
    { id: "ai", label: "AI & Data" },
    { id: "creative", label: "Creative Tech" },
  ];

  const projects = [
    {
      id: "01",
      categoryType: "ai",
      featured: true,
      title: "Neural Dashboard",
      tagline: "Real-time AI Model & Training Visualization Platform",
      category: "AI / Data Engineering",
      desc: "An interactive web-based analytics control room that visualizes deep learning layer activations, loss metrics, and training steps with sub-second WebSocket streaming.",
      tags: ["Next.js 15", "React 19", "D3.js", "TypeScript", "WebSocket", "Tailwind CSS"],
      accentBg: "bg-pink",
      icon: Brain,
      previewLabel: "neural-metrics.dev",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
    {
      id: "02",
      categoryType: "webapp",
      featured: false,
      title: "Trekker Trail Guide",
      tagline: "Community Hiking & Mountain Trail Explorer",
      category: "Fullstack Web App",
      desc: "A collaborative trail mapping platform featuring interactive GPS elevation profiles, offline map caching, and localized weather advisories.",
      tags: ["Next.js", "Mapbox GL", "PostgreSQL", "Prisma", "Tailwind CSS"],
      accentBg: "bg-yellow",
      icon: Mountain,
      previewLabel: "trekker-trails.app",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
    {
      id: "03",
      categoryType: "creative",
      featured: false,
      title: "Beat Studio Cloud",
      tagline: "Collaborative Web-Audio Synthesizer",
      category: "Creative Audio Tech",
      desc: "In-browser multi-track drum sequencer and audio synthesis engine with real-time peer audio sync and canvas spectrum visualizer.",
      tags: ["React", "Web Audio API", "WebRTC", "Canvas API", "TypeScript"],
      accentBg: "bg-green",
      icon: Music,
      previewLabel: "beatstudio.io",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.categoryType === filter);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
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
          clearProps: "transform,opacity",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      className="stacked-section stacked-panel-projects flex flex-col justify-center"
      id="projects"
      style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}
    >
      <div ref={contentRef} className="container-main section-depth-target">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2
              className="font-heading font-black uppercase tracking-tight leading-[1.1] text-black"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
            >
              Featured{" "}
              <span className="inline-block border-2 border-border bg-pink px-2.5 py-0.5 shadow-[3px_3px_0_#09090b] rotate-1">
                Projects
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <p className="max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
              Selected works spanning AI tooling, fullstack architectures, and creative computing.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={cn(
                    "border-2 border-border px-3 py-1 text-xs font-black uppercase tracking-wider transition-all cursor-pointer select-none",
                    filter === cat.id
                      ? "bg-black text-white shadow-[2px_2px_0_#fde047]"
                      : "bg-white text-black hover:bg-yellow hover:shadow-[2px_2px_0_#09090b]"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="neo-card group flex flex-col justify-between transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b] overflow-hidden"
              >
                <div>
                  {/* Window Browser Chrome Header */}
                  <div className="flex items-center justify-between border-b-2 border-border bg-[#ece8e1] px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full border border-border bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full border border-border bg-yellow" />
                      <span className="h-2.5 w-2.5 rounded-full border border-border bg-green" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-text-secondary">
                      {project.previewLabel}
                    </span>
                    {project.featured && (
                      <span className="border border-border bg-yellow px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider text-black">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Card Content Top */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-3.5 mb-3.5">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center border-2 border-border ${project.accentBg} text-black shadow-[2px_2px_0_#09090b] transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-muted mb-0.5">
                          {project.id} &mdash; {project.category}
                        </div>
                        <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-black">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-text-primary mb-2">
                      {project.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium mb-4">
                      {project.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="border-t-2 border-border pt-3.5">
                      <div className="text-[10px] font-black uppercase tracking-wider text-text-secondary mb-2">
                        Technologies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-border bg-[#f7f4ef] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-black"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Links */}
                <div className="border-t-2 border-border p-3.5 bg-[#f7f4ef] flex items-center justify-between gap-2 mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn group/btn bg-black px-3 py-1.5 text-xs text-white no-underline shadow-[2px_2px_0_#fde047] hover:shadow-[3px_3px_0_#fde047] transition-all duration-150"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn group/btn bg-white px-3 py-1.5 text-xs text-black no-underline hover:bg-yellow shadow-[2px_2px_0_#09090b] transition-all duration-150"
                  >
                    <GithubIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:rotate-12" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
