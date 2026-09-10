"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/marketing/logo";

const ANIMATION_DURATION_MS = 1900;

export function SiteIntro() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = logoRef.current;
    if (intro) {
      const introRect = intro.getBoundingClientRect();
      const introCenterX = introRect.left + introRect.width / 2;
      const introCenterY = introRect.top + introRect.height / 2;

      const target = document.querySelector<HTMLElement>("[data-site-logo-target]");
      let x: number;
      let y: number;
      let scale: number;

      if (target) {
        const targetRect = target.getBoundingClientRect();
        x = targetRect.left + targetRect.width / 2 - introCenterX;
        y = targetRect.top + targetRect.height / 2 - introCenterY;
        scale = targetRect.width / introRect.width;
      } else {
        // No navbar/sidebar on this page — head toward where one would sit.
        x = -introCenterX + 96;
        y = -introCenterY + 32;
        scale = 0.7;
      }

      intro.style.setProperty("--intro-x", `${x}px`);
      intro.style.setProperty("--intro-y", `${y}px`);
      intro.style.setProperty("--intro-scale", `${scale}`);
    }

    // Apply the animation class on the next frame so the CSS variables above are
    // already set when the keyframes read them.
    const raf = requestAnimationFrame(() => setReady(true));
    const timer = setTimeout(() => setVisible(false), ANIMATION_DURATION_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background">
      <div ref={logoRef} className={ready ? "site-intro-logo" : "opacity-0"}>
        <Logo />
      </div>
    </div>
  );
}
