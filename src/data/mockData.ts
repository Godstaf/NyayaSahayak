// Mock data for DigiLocker documents
export interface DigiLockerDocument {
  id: string;
  name: string;
  type: "aadhaar" | "pan" | "driving_license" | "voter_id" | "passport" | "education" | "property" | "other";
  issuedBy: string;
  issuedDate: string;
  expiryDate?: string;
  status: "verified" | "pending" | "expired";
  documentNumber: string;
  lastAccessed: string;
}

export const mockDigiLockerDocuments: DigiLockerDocument[] = [
  {
    id: "doc-1",
    name: "Aadhaar Card",
    type: "aadhaar",
    issuedBy: "UIDAI",
    issuedDate: "2015-03-15",
    status: "verified",
    documentNumber: "XXXX-XXXX-4521",
    lastAccessed: "2024-01-10",
  },
  {
    id: "doc-2",
    name: "PAN Card",
    type: "pan",
    issuedBy: "Income Tax Department",
    issuedDate: "2018-06-22",
    status: "verified",
    documentNumber: "ABCPD1234F",
    lastAccessed: "2024-01-08",
  },
  {
    id: "doc-3",
    name: "Driving License",
    type: "driving_license",
    issuedBy: "RTO Maharashtra",
    issuedDate: "2020-09-10",
    expiryDate: "2040-09-09",
    status: "verified",
    documentNumber: "MH-12-20200004521",
    lastAccessed: "2024-01-05",
  },
  {
    id: "doc-4",
    name: "Voter ID Card",
    type: "voter_id",
    issuedBy: "Election Commission of India",
    issuedDate: "2016-11-20",
    status: "verified",
    documentNumber: "XYZ1234567",
    lastAccessed: "2023-12-15",
  },
  {
    id: "doc-5",
    name: "Class X Marksheet",
    type: "education",
    issuedBy: "CBSE Board",
    issuedDate: "2012-05-30",
    status: "verified",
    documentNumber: "CBSE-2012-45678",
    lastAccessed: "2023-11-20",
  },
  {
    id: "doc-6",
    name: "Property Registration",
    type: "property",
    issuedBy: "Sub-Registrar Office, Mumbai",
    issuedDate: "2022-03-18",
    status: "pending",
    documentNumber: "REG-MH-2022-78901",
    lastAccessed: "2024-01-02",
  },
];

// Mock legal cases data
export interface LegalCase {
  id: string;
  caseNumber: string;
  title: string;
  court: string;
  status: "active" | "pending" | "closed" | "appeal";
  filingDate: string;
  nextHearing?: string;
  type: "civil" | "criminal" | "family" | "consumer" | "property" | "labor";
  description: string;
  lawyer?: string;
}

export const mockLegalCases: LegalCase[] = [
  {
    id: "case-1",
    caseNumber: "CW-2023-45678",
    title: "Property Dispute - Sharma vs. Kumar",
    court: "High Court of Maharashtra",
    status: "active",
    filingDate: "2023-06-15",
    nextHearing: "2024-02-20",
    type: "property",
    description: "Dispute regarding ancestral property partition between family members.",
    lawyer: "Adv. Rajesh Mehta",
  },
  {
    id: "case-2",
    caseNumber: "CC-2024-12345",
    title: "Consumer Complaint - Defective Product",
    court: "Consumer Forum, Mumbai",
    status: "pending",
    filingDate: "2024-01-05",
    type: "consumer",
    description: "Complaint against XYZ Electronics for selling defective refrigerator.",
  },
  {
    id: "case-3",
    caseNumber: "FC-2022-98765",
    title: "Maintenance Claim - Family Court",
    court: "Family Court, Delhi",
    status: "closed",
    filingDate: "2022-08-10",
    type: "family",
    description: "Monthly maintenance claim settled through mutual consent.",
    lawyer: "Adv. Priya Singh",
  },
];

// Knowledge base categories and articles
export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
  readTime: number;
  popularity: number;
}

export const knowledgeCategories = [
  { id: "property", name: "Property Law", icon: "Home", count: 24 },
  { id: "family", name: "Family Law", icon: "Users", count: 18 },
  { id: "consumer", name: "Consumer Rights", icon: "ShoppingBag", count: 15 },
  { id: "labor", name: "Labor Law", icon: "Briefcase", count: 21 },
  { id: "criminal", name: "Criminal Law", icon: "Shield", count: 12 },
  { id: "constitutional", name: "Constitutional Law", icon: "Scale", count: 9 },
  { id: "cyber", name: "Cyber Law", icon: "Globe", count: 16 },
  { id: "tax", name: "Tax Law", icon: "Receipt", count: 14 },
];

export const mockKnowledgeArticles: KnowledgeArticle[] = [
  {
    id: "art-1",
    title: "Understanding Your Rights as a Tenant",
    category: "property",
    summary: "Learn about tenant rights, security deposits, rent control, and eviction procedures under Indian law.",
    content: `# Tenant Rights in India

## Overview
As a tenant in India, you are protected by various laws including the Rent Control Act and Transfer of Property Act.

## Key Rights
1. **Right to Receipt**: Always get a receipt for rent paid
2. **Security Deposit**: Cannot exceed 2-3 months rent in most states
3. **Notice Period**: Landlord must provide adequate notice before eviction
4. **Essential Services**: Cannot be denied water, electricity

## Important Acts
- Rent Control Act (varies by state)
- Transfer of Property Act, 1882
- Model Tenancy Act, 2021`,
    tags: ["tenant", "rent", "property", "landlord"],
    readTime: 5,
    popularity: 95,
  },
  {
    id: "art-2",
    title: "Filing a Consumer Complaint: Step-by-Step Guide",
    category: "consumer",
    summary: "Complete guide to filing consumer complaints online and offline, including documentation required.",
    content: `# How to File a Consumer Complaint

## When Can You File?
- Defective goods or services
- Unfair trade practices
- Overcharging beyond MRP

## Steps to File
1. Send legal notice to the company
2. Collect all bills and receipts
3. File complaint on consumerhelpline.gov.in
4. Attend hearings

## Compensation Types
- Refund of amount paid
- Replacement of goods
- Compensation for mental agony`,
    tags: ["consumer", "complaint", "rights", "refund"],
    readTime: 7,
    popularity: 88,
  },
  {
    id: "art-3",
    title: "Divorce Procedures in India: A Complete Guide",
    category: "family",
    summary: "Understanding mutual consent and contested divorce procedures, timelines, and legal requirements.",
    content: `# Divorce in India

## Types of Divorce
1. **Mutual Consent Divorce**
   - Both parties agree
   - 6-18 months process
   - Simpler and faster

2. **Contested Divorce**
   - One party files
   - May take 3-5 years
   - Requires grounds like cruelty, desertion

## Key Considerations
- Child custody
- Alimony/Maintenance
- Property division`,
    tags: ["divorce", "family", "marriage", "custody"],
    readTime: 10,
    popularity: 92,
  },
  {
    id: "art-4",
    title: "Workplace Harassment: Know Your Legal Options",
    category: "labor",
    summary: "Understanding workplace harassment laws, POSH Act compliance, and how to file complaints.",
    content: `# Workplace Harassment Laws

## POSH Act 2013
Every organization with 10+ employees must have an Internal Complaints Committee.

## Types of Harassment
- Sexual harassment
- Verbal abuse
- Discrimination

## How to Report
1. File written complaint with ICC
2. Committee investigation (90 days)
3. Action within 60 days of report`,
    tags: ["harassment", "workplace", "POSH", "employment"],
    readTime: 8,
    popularity: 85,
  },
  {
    id: "art-5",
    title: "FIR Filing: Your Rights and Procedure",
    category: "criminal",
    summary: "Learn when and how to file an FIR, your rights if police refuse, and zero FIR concept.",
    content: `# Filing an FIR

## What is an FIR?
First Information Report - the first step in criminal proceedings.

## Your Rights
- Police MUST register FIR for cognizable offenses
- Get a free copy of FIR
- Zero FIR: File at any police station

## If Police Refuse
- Approach SP/DCP
- File private complaint in court
- Approach State Human Rights Commission`,
    tags: ["FIR", "police", "criminal", "complaint"],
    readTime: 6,
    popularity: 90,
  },
];

// AI Chat sample responses
export const sampleChatResponses = [
  {
    query: "property dispute",
    response: `I can help you with property disputes. Based on Indian law, here are your options:

**Immediate Steps:**
1. Gather all property documents (sale deed, registry, etc.)
2. Check if the property is registered on Doris portal
3. Verify encumbrance certificate from Sub-Registrar

**Legal Remedies:**
- **Civil Suit**: File a declaratory suit in civil court
- **Revenue Court**: For agricultural land disputes
- **RERA**: For builder-related issues

**Timeline:** Civil suits typically take 3-5 years. Consider mediation for faster resolution.

Would you like me to help you draft a legal notice or find lawyers specializing in property law?`,
  },
  {
    query: "divorce",
    response: `I understand you need guidance on divorce proceedings. Here's what you should know:

**Types of Divorce in India:**
1. **Mutual Consent** (Section 13B, Hindu Marriage Act)
   - Both spouses agree
   - Minimum 1 year of separation
   - 6-18 months to complete

2. **Contested Divorce**
   - Grounds: Cruelty, adultery, desertion, mental disorder
   - Can take 3-5 years

**Key Considerations:**
- Child custody and visitation rights
- Alimony/maintenance calculations
- Division of jointly owned property

**Documents Needed:**
- Marriage certificate
- Address proof
- Income proof of both parties

Would you like information about free legal aid or family courts near you?`,
  },
];
