import type { CSSProperties, ReactNode } from "react";

/**
 * A section as it arrives: up 16px over 0.6s on the design's own easing,
 * once. It is a CSS animation rather than a scroll-driven one on purpose —
 * the end state is the plain, visible page, so nothing on this site can be
 * left invisible by a listener that did not fire. prefers-reduced-motion
 * turns it off in index.css.
 */
export default function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
