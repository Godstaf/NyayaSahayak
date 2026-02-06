import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, FileText, BookOpen, Shield, Zap, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { TypewriterText } from "@/components/TypewriterText";
import { FeatureCard } from "@/components/FeatureCard";
import { PageTransition, AnimatedContainer } from "@/components/PageTransition";

const features = [
  {
    icon: MessageSquare,
    title: "AI Legal Assistant",
    description: "Get instant answers to your legal queries powered by advanced AI trained on Indian law.",
  },
  {
    icon: FileText,
    title: "DigiLocker Integration",
    description: "Securely access and manage your legal documents through DigiLocker integration.",
  },
  {
    icon: BookOpen,
    title: "Legal Knowledge Base",
    description: "Browse comprehensive guides on property law, consumer rights, family law, and more.",
  },
  {
    icon: Shield,
    title: "Case Tracking",
    description: "Track your ongoing legal cases with real-time updates from court databases.",
  },
];

const stats = [
  { value: "10M+", label: "Legal Queries Answered" },
  { value: "500+", label: "Legal Topics Covered" },
  { value: "98%", label: "User Satisfaction" },
  { value: "24/7", label: "AI Availability" },
];

export default function Landing() {
  return (
    <PageTransition>
      <main className="relative overflow-hidden pt-24">
        {/* Hero Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <AnimatedContainer delay={0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
                >
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    AI-Powered Legal Assistance
                  </span>
                </motion.div>
              </AnimatedContainer>

              {/* Heading */}
              <AnimatedContainer delay={0.2}>
                <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="text-foreground">Your Personal </span>
                  <span className="gradient-text">Legal AI Assistant</span>
                </h1>
              </AnimatedContainer>

              {/* Subheading with Typewriter */}
              <AnimatedContainer delay={0.3} className="mb-8 max-w-2xl">
                <p className="text-lg text-muted-foreground sm:text-xl">
                  <TypewriterText
                    text="Navigate Indian legal system with confidence. Get instant answers, access documents, and understand your rights."
                    speed={25}
                    delay={800}
                  />
                </p>
              </AnimatedContainer>

              {/* CTA Buttons */}
              <AnimatedContainer delay={0.4}>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link to="/chat">
                    <Button
                      size="lg"
                      className="animated-gradient group gap-2 px-8 text-white hover:opacity-90"
                    >
                      Start Free Consultation
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/knowledge">
                    <Button size="lg" variant="outline" className="gap-2 px-8">
                      <BookOpen className="h-4 w-4" />
                      Browse Knowledge Base
                    </Button>
                  </Link>
                </div>
              </AnimatedContainer>

              {/* Hero Visual */}
              <AnimatedContainer delay={0.5} className="mt-16 w-full max-w-4xl">
                <GlassCard className="p-0 overflow-hidden" tiltEnabled={true}>
                  <div className="relative p-8">
                    {/* Mock Chat Interface */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 rounded-2xl rounded-tl-sm bg-muted/50 p-4">
                          <p className="text-sm text-foreground">
                            How do I file a consumer complaint against a defective product?
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full animated-gradient">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 rounded-2xl rounded-tl-sm border border-primary/20 bg-primary/5 p-4">
                          <p className="text-sm text-foreground">
                            You can file a consumer complaint through the Consumer Forum. Here are the steps...
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
                              Consumer Forum
                            </span>
                            <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs text-secondary">
                              Online Filing
                            </span>
                            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">
                              Documentation
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements - using CSS animation instead of JS */}
                    <div
                      className="absolute -right-4 -top-4 rounded-xl border border-primary/30 bg-card p-3 shadow-lg float"
                    >
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <AnimatedContainer key={stat.label} delay={0.1 * index}>
                  <div className="text-center">
                    <p className="gradient-text text-3xl font-bold sm:text-4xl md:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                      {stat.label}
                    </p>
                  </div>
                </AnimatedContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatedContainer className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Powerful Features for{" "}
                <span className="gradient-text">Legal Assistance</span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Everything you need to understand and navigate the Indian legal system
              </p>
            </AnimatedContainer>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <GlassCard className="overflow-hidden" tiltEnabled={false}>
              <div className="relative flex flex-col items-center p-8 text-center md:p-12">
                {/* Static glow - no animation needed, looks similar */}
                <div
                  className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl"
                />
                <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                  Ready to Get <span className="gradient-text">Legal Help</span>?
                </h2>
                <p className="mb-8 max-w-xl text-muted-foreground">
                  Start a conversation with our AI assistant and get instant guidance on your legal matters.
                </p>
                <Link to="/chat">
                  <Button
                    size="lg"
                    className="animated-gradient group gap-2 px-8 text-white hover:opacity-90"
                  >
                    Start Free Consultation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2024 NyayaSahayak. Empowering legal awareness in India.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </PageTransition>
  );
}
