import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Clock,
  TrendingUp,
  ArrowRight,
  Home,
  Users,
  ShoppingBag,
  Briefcase,
  Shield,
  Scale,
  Globe,
  Receipt,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { PageTransition, AnimatedContainer } from "@/components/PageTransition";
import { knowledgeCategories, mockKnowledgeArticles, KnowledgeArticle } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const categoryIcons: Record<string, React.ElementType> = {
  property: Home,
  family: Users,
  consumer: ShoppingBag,
  labor: Briefcase,
  criminal: Shield,
  constitutional: Scale,
  cyber: Globe,
  tax: Receipt,
};

export default function Knowledge() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const filteredArticles = mockKnowledgeArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularArticles = [...mockKnowledgeArticles]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedContainer className="mb-8 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Legal <span className="gradient-text">Knowledge Base</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive guides on Indian law covering property, family, consumer rights, and more
            </p>
          </AnimatedContainer>

          {/* Search */}
          <AnimatedContainer delay={0.1} className="mb-12">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search legal topics, articles, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 rounded-2xl border-border/50 bg-muted/30 pl-12 text-lg focus:border-primary/50"
                />
              </div>
            </div>
          </AnimatedContainer>

          {/* Categories */}
          <AnimatedContainer delay={0.2} className="mb-12">
            <h2 className="mb-6 text-xl font-semibold">Browse by Category</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {knowledgeCategories.map((category, index) => {
                const Icon = categoryIcons[category.id] || BookOpen;
                const isSelected = selectedCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() =>
                      setSelectedCategory(isSelected ? null : category.id)
                    }
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        isSelected ? "bg-primary/20" : "bg-muted"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <span className="text-center text-xs font-medium">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {category.count} articles
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </AnimatedContainer>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Articles */}
            <div className="lg:col-span-2">
              <AnimatedContainer delay={0.3}>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {selectedCategory
                      ? `${knowledgeCategories.find((c) => c.id === selectedCategory)?.name} Articles`
                      : "All Articles"}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredArticles.length} articles
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard
                        className="cursor-pointer group"
                        delay={0}
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                                {article.category}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {article.readTime} min read
                              </span>
                            </div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                              {article.summary}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {article.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </AnimatedContainer>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Articles */}
              <AnimatedContainer delay={0.4}>
                <GlassCard tiltEnabled={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Popular Articles</h3>
                  </div>
                  <div className="space-y-4">
                    {popularArticles.map((article, index) => (
                      <button
                        key={article.id}
                        onClick={() => setSelectedArticle(article)}
                        className="flex items-start gap-3 text-left hover:bg-muted/30 -mx-2 px-2 py-2 rounded-lg transition-colors w-full"
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium hover:text-primary transition-colors">
                            {article.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {article.readTime} min read
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedContainer>

              {/* Quick Links */}
              <AnimatedContainer delay={0.5}>
                <GlassCard tiltEnabled={false}>
                  <h3 className="font-semibold mb-4">Quick Legal Resources</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Legal Services Authority", url: "#" },
                      { name: "Consumer Helpline", url: "#" },
                      { name: "e-Courts Services", url: "#" },
                      { name: "NALSA Free Legal Aid", url: "#" },
                    ].map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm transition-colors hover:bg-muted/50"
                      >
                        {link.name}
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedContainer>
            </div>
          </div>

          {/* Article Modal */}
          <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
            <DialogContent className="glass border-primary/20 sm:max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                    {selectedArticle?.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {selectedArticle?.readTime} min read
                  </span>
                </div>
                <DialogTitle className="gradient-text text-xl">
                  {selectedArticle?.title}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[50vh] pr-4">
                {selectedArticle && (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <p className="text-muted-foreground">{selectedArticle.summary}</p>
                    <div className="mt-4 whitespace-pre-wrap text-sm">
                      {selectedArticle.content}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </PageTransition>
  );
}
