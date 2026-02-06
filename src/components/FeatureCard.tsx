import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { memo } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = memo(function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0
}: FeatureCardProps) {
  return (
    <GlassCard delay={delay} className="group h-full">
      <div className="flex flex-col items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 transition-transform duration-200 group-hover:scale-105">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </GlassCard>
  );
});

