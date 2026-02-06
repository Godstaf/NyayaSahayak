import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CreditCard,
  Car,
  Vote,
  GraduationCap,
  Home,
  Search,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/GlassCard";
import { PageTransition, AnimatedContainer } from "@/components/PageTransition";
import { mockDigiLockerDocuments, mockLegalCases, DigiLockerDocument, LegalCase } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const documentIcons: Record<string, React.ElementType> = {
  aadhaar: CreditCard,
  pan: CreditCard,
  driving_license: Car,
  voter_id: Vote,
  education: GraduationCap,
  property: Home,
  other: FileText,
  passport: FileText,
};

const statusConfig = {
  verified: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
  pending: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  expired: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10" },
  active: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
  closed: { icon: CheckCircle2, color: "text-muted-foreground", bg: "bg-muted/50" },
  appeal: { icon: AlertCircle, color: "text-orange-400", bg: "bg-orange-400/10" },
};

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"documents" | "cases">("documents");
  const [selectedDoc, setSelectedDoc] = useState<DigiLockerDocument | null>(null);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);

  const filteredDocuments = mockDigiLockerDocuments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCases = mockLegalCases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <main className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedContainer className="mb-8">
            <h1 className="text-3xl font-bold sm:text-4xl">
              <span className="gradient-text">DigiLocker</span> & Legal Documents
            </h1>
            <p className="mt-2 text-muted-foreground">
              Access your verified documents and track ongoing legal cases
            </p>
          </AnimatedContainer>

          {/* Search and Tabs */}
          <AnimatedContainer delay={0.1} className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents or cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "documents" ? "default" : "outline"}
                  onClick={() => setActiveTab("documents")}
                  className={cn(activeTab === "documents" && "animated-gradient text-white")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </Button>
                <Button
                  variant={activeTab === "cases" ? "default" : "outline"}
                  onClick={() => setActiveTab("cases")}
                  className={cn(activeTab === "cases" && "animated-gradient text-white")}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Legal Cases
                </Button>
              </div>
            </div>
          </AnimatedContainer>

          {/* DigiLocker Integration Banner */}
          <AnimatedContainer delay={0.2} className="mb-8">
            <GlassCard className="flex flex-col items-center justify-between gap-4 sm:flex-row" tiltEnabled={false}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">DigiLocker Connected</h3>
                  <p className="text-sm text-muted-foreground">
                    Your documents are synced with DigiLocker
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-3 w-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-green-400">Verified Account</span>
              </div>
            </GlassCard>
          </AnimatedContainer>

          {/* Documents Grid */}
          {activeTab === "documents" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((doc, index) => {
                const Icon = documentIcons[doc.type] || FileText;
                const status = statusConfig[doc.status];
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard
                      className="cursor-pointer"
                      delay={0}
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className={cn("flex items-center gap-1 rounded-full px-2 py-1", status.bg)}>
                          <StatusIcon className={cn("h-3 w-3", status.color)} />
                          <span className={cn("text-xs font-medium capitalize", status.color)}>
                            {doc.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">{doc.issuedBy}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                        <span className="text-xs text-muted-foreground">
                          Doc: {doc.documentNumber}
                        </span>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Legal Cases */}
          {activeTab === "cases" && (
            <div className="space-y-4">
              {filteredCases.map((legalCase, index) => {
                const status = statusConfig[legalCase.status];
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={legalCase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard
                      className="cursor-pointer"
                      delay={0}
                      onClick={() => setSelectedCase(legalCase)}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={cn("flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium", status.bg)}>
                              <StatusIcon className={cn("h-3 w-3", status.color)} />
                              <span className={status.color}>{legalCase.status.toUpperCase()}</span>
                            </span>
                            <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize">
                              {legalCase.type}
                            </span>
                          </div>
                          <h3 className="font-semibold">{legalCase.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{legalCase.description}</p>
                        </div>
                        <div className="text-right sm:text-left">
                          <p className="text-sm font-medium">{legalCase.caseNumber}</p>
                          <p className="text-xs text-muted-foreground">{legalCase.court}</p>
                          {legalCase.nextHearing && (
                            <p className="mt-2 text-xs text-primary">
                              Next Hearing: {new Date(legalCase.nextHearing).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Document Detail Modal */}
          <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
            <DialogContent className="glass border-primary/20 sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="gradient-text">{selectedDoc?.name}</DialogTitle>
                <DialogDescription>Document Details from DigiLocker</DialogDescription>
              </DialogHeader>
              {selectedDoc && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Document Number</p>
                      <p className="font-medium">{selectedDoc.documentNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{selectedDoc.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Issued By</p>
                      <p className="font-medium">{selectedDoc.issuedBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Issue Date</p>
                      <p className="font-medium">
                        {new Date(selectedDoc.issuedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 animated-gradient text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Case Detail Modal */}
          <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
            <DialogContent className="glass border-primary/20 sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="gradient-text">{selectedCase?.caseNumber}</DialogTitle>
                <DialogDescription>{selectedCase?.title}</DialogDescription>
              </DialogHeader>
              {selectedCase && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Court</p>
                      <p className="font-medium">{selectedCase.court}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="font-medium capitalize">{selectedCase.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Filing Date</p>
                      <p className="font-medium">
                        {new Date(selectedCase.filingDate).toLocaleDateString()}
                      </p>
                    </div>
                    {selectedCase.nextHearing && (
                      <div>
                        <p className="text-xs text-muted-foreground">Next Hearing</p>
                        <p className="font-medium text-primary">
                          {new Date(selectedCase.nextHearing).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {selectedCase.lawyer && (
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground">Lawyer</p>
                        <p className="font-medium">{selectedCase.lawyer}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-sm mt-1">{selectedCase.description}</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </PageTransition>
  );
}
