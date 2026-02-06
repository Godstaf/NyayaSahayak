import { memo } from "react";

// CSS-based animations are much more performant than JS-driven Framer Motion
const orbStyles = `
  @keyframes orb1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(50px, 25px) scale(1.1); }
    66% { transform: translate(25px, 50px) scale(0.95); }
  }
  @keyframes orb2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-40px, 40px) scale(0.95); }
    66% { transform: translate(-20px, -20px) scale(1.05); }
  }
  @keyframes orb3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-30px, 30px) scale(0.97); }
  }
`;

export const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <style>{orbStyles}</style>

      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated orbs - using CSS animations with will-change for GPU acceleration */}
      <div
        className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]"
        style={{
          animation: "orb1 25s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      <div
        className="absolute top-[40%] right-[10%] h-[400px] w-[400px] rounded-full bg-secondary/20 blur-[80px]"
        style={{
          animation: "orb2 30s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      <div
        className="absolute bottom-[10%] left-[30%] h-[350px] w-[350px] rounded-full bg-accent/15 blur-[60px]"
        style={{
          animation: "orb3 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Grid overlay - static, no performance impact */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture - reduced octaves from 4 to 2 for less GPU load */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <svg className="h-full w-full" aria-hidden="true">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
});
