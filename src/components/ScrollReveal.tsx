"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    // Select all elements with the reveal-init class
    const elements = document.querySelectorAll(".reveal-init");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // Optional: unobserve once revealed to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
