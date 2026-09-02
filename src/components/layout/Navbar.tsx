"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Journey", href: "#experience", id: "experience" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const getElementDocumentTop = (element: HTMLElement): number => {
      let top = 0;
      let curr: HTMLElement | null = element;
      while (curr && curr !== document.body) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement;
      }
      return top;
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["contact", "experience", "projects", "skills", "about"];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      
      let found = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = getElementDocumentTop(el);
          if (scrollPos >= top) {
            found = section;
            break;
          }
        }
      }
      setActiveSection(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b-2 border-border transition-all duration-200",
          scrolled
            ? "bg-[#f7f4ef]/95 backdrop-blur-md py-2.5 shadow-sm"
            : "bg-[#f7f4ef]/85 backdrop-blur-sm py-3.5"
        )}
      >
        <div className="container-main flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 no-underline"
          >
            <div className="flex h-9 w-9 items-center justify-center border-2 border-border bg-yellow text-sm font-black text-black shadow-[2px_2px_0_#09090b] transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[3px_3px_0_#09090b]">
              R
            </div>
            <span className="font-heading text-lg font-black tracking-tight text-black">
              Ridho<span className="text-pink text-xl leading-none">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <ul className="flex items-center gap-2 lg:gap-2.5 list-none">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={cn(
                        "inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider no-underline transition-all duration-150 border-2",
                        isActive
                          ? "border-border bg-yellow text-black shadow-[2px_2px_0_#09090b]"
                          : "border-transparent text-text-secondary hover:text-black hover:border-border hover:bg-white"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              className="neo-btn bg-yellow px-4 py-2 text-xs text-black no-underline shadow-[2px_2px_0_#09090b]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center border-2 border-border bg-white text-black shadow-[2px_2px_0_#09090b] md:hidden cursor-pointer active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-[80vw] max-w-xs flex-col justify-between border-l-2 border-border bg-[#f7f4ef] p-6 shadow-2xl transition-transform duration-300 ease-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b-2 border-border pb-4">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-black">
              Menu Navigation
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center border-2 border-border bg-white shadow-[2px_2px_0_#09090b] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between border-2 p-3 font-heading text-sm font-bold uppercase tracking-wide text-black no-underline transition-all",
                  activeSection === link.id
                    ? "border-border bg-yellow shadow-[3px_3px_0_#09090b]"
                    : "border-transparent bg-white/70 hover:border-border hover:bg-white hover:shadow-[3px_3px_0_#09090b]"
                )}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-text-muted" />
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t-2 border-border pt-5">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="neo-btn w-full justify-center bg-yellow py-3 text-xs text-black no-underline"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
