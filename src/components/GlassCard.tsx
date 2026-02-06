import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef, useCallback, memo } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tiltEnabled?: boolean;
  hoverScale?: boolean;
  glowOnHover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export const GlassCard = memo(function GlassCard({
  children,
  className,
  tiltEnabled = false, // Changed default to false - opt-in for tilt
  hoverScale = true,
  glowOnHover = true,
  delay = 0,
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reduced stiffness = fewer calculations, still smooth
  const mouseXSpring = useSpring(x, { stiffness: 80, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 80, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Throttled to ~60fps to prevent excessive calculations
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tiltEnabled) return;

    const now = performance.now();
    if (now - lastMoveTime.current < 16) return; // ~60fps throttle
    lastMoveTime.current = now;

    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }, [tiltEnabled, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={
        tiltEnabled
          ? {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }
          : undefined
      }
      whileHover={hoverScale ? { scale: 1.01 } : undefined}
      onMouseMove={tiltEnabled ? handleMouseMove : undefined}
      onMouseLeave={tiltEnabled ? handleMouseLeave : undefined}
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-shadow duration-300",
        glowOnHover && "hover:shadow-[0_0_30px_hsl(270_80%_60%/0.25)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {tiltEnabled ? (
        <div style={{ transform: "translateZ(30px)" }}>{children}</div>
      ) : (
        children
      )}
    </motion.div>
  );
});
