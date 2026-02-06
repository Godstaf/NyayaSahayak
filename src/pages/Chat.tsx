import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, FileText, Scale, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlassCard } from "@/components/GlassCard";
import { TypewriterText } from "@/components/TypewriterText";
import { PageTransition, AnimatedContainer } from "@/components/PageTransition";
import { sampleChatResponses } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const suggestedQueries = [
  "How to file a consumer complaint?",
  "What are my rights as a tenant?",
  "How to get a divorce in India?",
  "Property dispute resolution options",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("property") || lowerQuery.includes("dispute")) {
      return sampleChatResponses[0].response;
    }
    if (lowerQuery.includes("divorce") || lowerQuery.includes("marriage")) {
      return sampleChatResponses[1].response;
    }
    if (lowerQuery.includes("consumer") || lowerQuery.includes("complaint") || lowerQuery.includes("defective")) {
      return `I can help you file a consumer complaint. Here's what you need to know:

**Filing a Consumer Complaint:**

1. **National Consumer Helpline**: Call 1800-11-4000 (toll-free)
2. **Online Portal**: Visit consumerhelpline.gov.in

**Required Documents:**
- Purchase bill/invoice
- Warranty card (if applicable)
- Written complaint description
- Proof of defect (photos/videos)

**Jurisdiction:**
- Up to ₹1 Crore: District Forum
- ₹1-10 Crore: State Commission
- Above ₹10 Crore: National Commission

**Timeline:** Cases are typically resolved within 3-5 months.

Would you like me to help you draft a complaint letter?`;
    }
    if (lowerQuery.includes("tenant") || lowerQuery.includes("rent") || lowerQuery.includes("landlord")) {
      return `As a tenant in India, you have several important rights:

**Key Tenant Rights:**

1. **Written Agreement**: Always insist on a registered rental agreement
2. **Security Deposit**: 
   - Maximum 2-3 months rent (varies by state)
   - Must be returned within 1 month of vacating
3. **Notice Period**: Typically 1-3 months as per agreement
4. **Essential Services**: Cannot be denied water, electricity

**Protection Against Illegal Eviction:**
- Landlord must give proper notice
- Cannot force eviction without court order
- Can approach Rent Controller for disputes

**Important Acts:**
- Rent Control Act (state-specific)
- Model Tenancy Act, 2021

Would you like information about rent control laws in your state?`;
    }

    return `Thank you for your question about "${query}".

Based on Indian law, I can provide guidance on this matter. Here are some key points:

**General Legal Framework:**
1. Review applicable laws and regulations
2. Document all relevant information
3. Consider alternative dispute resolution
4. Consult with a qualified advocate if needed

**Recommended Steps:**
- Gather all relevant documents
- Understand your legal rights
- Explore mediation options
- Prepare for potential litigation

**Free Legal Aid:**
If you cannot afford a lawyer, you may be eligible for free legal aid under the Legal Services Authority Act, 1987. Contact your district legal services authority.

Would you like me to provide more specific information on any of these points?`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = generateResponse(userMessage.content);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);

    // Mark typing as complete after animation
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id ? { ...msg, isTyping: false } : msg
        )
      );
    }, response.length * 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (query: string) => {
    setInput(query);
    textareaRef.current?.focus();
  };

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col pt-24">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedContainer className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl animated-gradient">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Legal AI Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  Ask any legal question in natural language
                </p>
              </div>
            </div>
          </AnimatedContainer>

          {/* Chat Area */}
          <GlassCard className="flex flex-1 flex-col p-0" tiltEnabled={false}>
            <ScrollArea ref={scrollRef} className="flex-1 p-6">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl animated-gradient"
                  >
                    <Sparkles className="h-10 w-10 text-white" />
                  </motion.div>
                  <h2 className="mb-2 text-xl font-semibold">How can I help you today?</h2>
                  <p className="mb-8 max-w-md text-center text-muted-foreground">
                    Ask me anything about Indian law - property disputes, consumer rights, family matters, and more.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {suggestedQueries.map((query, index) => (
                      <motion.button
                        key={query}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        onClick={() => handleSuggestionClick(query)}
                        className="rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-left text-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
                      >
                        {query}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex items-start gap-3",
                          message.role === "user" && "flex-row-reverse"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                            message.role === "user"
                              ? "bg-primary/20"
                              : "animated-gradient"
                          )}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-primary" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3",
                            message.role === "user"
                              ? "rounded-tr-sm bg-primary/20"
                              : "rounded-tl-sm border border-primary/20 bg-card"
                          )}
                        >
                          <div className="prose prose-sm prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-sm text-foreground">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Loading indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full animated-gradient">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="rounded-2xl rounded-tl-sm border border-primary/20 bg-card px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Analyzing your query...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4">
              <div className="flex items-end gap-3">
                <div className="relative flex-1">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your legal question..."
                    className="min-h-[50px] max-h-[150px] resize-none rounded-xl border-border/50 bg-muted/30 pr-12 focus:border-primary/50"
                    rows={1}
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-lg animated-gradient text-white hover:opacity-90 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                NyayaSahayak provides general legal information. For specific advice, consult a qualified advocate.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
    </PageTransition>
  );
}
