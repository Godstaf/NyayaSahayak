# Demo Script & Presentation Guide

## 🎯 Demo Objectives

1. **Show the Problem** - Demonstrate the pain of current legal workflows
2. **Reveal the Solution** - NyayaSahayak in action
3. **Prove the Technology** - DigiLocker integration + Legal RAG
4. **Build Confidence** - Privacy & security approach

---

## 🎬 Demo Script (5 Minutes)

### Opening Hook (30 seconds)

**Presenter:**
> "Imagine you're stopped by traffic police. They claim your insurance is expired. You know it's valid, but can you prove it in 30 seconds? Can you cite the law that makes your digital document legally valid?
>
> **70% of Indians face a minor legal issue every year.** Most pay bribes, ignore their rights, or sign unfair agreements—simply because accessing legal help is too hard.
>
> **This is the Minor Justice Gap. And we're here to close it.**"

---

### Demo Flow

#### Scene 1: The Traffic Stop (90 seconds)

**Scenario Setup:**
> "Let's meet Rahul. He's been stopped by traffic police in Mumbai. The officer claims his insurance has expired."

**Demo Actions:**

```
┌─────────────────────────────────────────────────────────────┐
│ 📱 NyayaSahayak App                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 👤 Rahul: "Police stopped me for no insurance"              │
│                                                              │
│ ⏳ Processing...                                            │
│    ├── 🔐 Checking DigiLocker...                            │
│    ├── 📄 Fetching Insurance Certificate...                 │
│    └── ⚖️ Retrieving legal backing...                       │
│                                                              │
│ ✅ YOUR INSURANCE IS VALID                                  │
│                                                              │
│ 📋 Insurance Details:                                       │
│    Policy: ICICI/1234567890                                 │
│    Valid Until: 31-Dec-2026                                 │
│    Status: ✅ ACTIVE                                        │
│                                                              │
│ 🏛️ Show to Officer:                                        │
│    "Under Rule 9A of the IT Rules, 2011, documents         │
│    from DigiLocker are legally equivalent to originals."   │
│                                                              │
│ [📸 Display for Officer]  [📝 File Complaint if Harassed]  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Talking Points:**
- "Notice: Rahul didn't upload anything. The agent **pulled** the document from DigiLocker."
- "In 30 seconds, he has verified proof AND the exact legal citation to show the officer."
- "No more anxiety. No more bribes."

---

#### Scene 2: The Rental Agreement (90 seconds)

**Scenario Setup:**
> "Now let's see Priya, who's moving to a new flat in Pune and needs a rental agreement."

**Demo Actions:**

```
┌─────────────────────────────────────────────────────────────┐
│ 📱 NyayaSahayak App                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 👤 Priya: "I need a rental agreement for my flat in Pune"  │
│                                                              │
│ 🤖 Agent: "I'll help you create a legally compliant        │
│    rental agreement. Let me fetch your documents."          │
│                                                              │
│ ⏳ Fetching from DigiLocker...                              │
│    ├── ✅ Aadhaar verified                                  │
│    └── ✅ PAN verified                                      │
│                                                              │
│ 📝 Just need a few details:                                 │
│                                                              │
│ Landlord Name: [__________________]                         │
│ Property Address: [__________________]                      │
│ Monthly Rent: ₹ [______]                                    │
│ Security Deposit: ₹ [______]                                │
│ Duration: [11 months ▼]                                     │
│                                                              │
│ [Generate Agreement]                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**After Generation:**

```
┌─────────────────────────────────────────────────────────────┐
│ ✅ RENTAL AGREEMENT READY                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 📄 Document Details:                                        │
│                                                              │
│ Tenant: Priya Sharma (from Aadhaar)                         │
│ PAN: ABCDE1234F (from DigiLocker)                          │
│ Property: Flat 302, Kumar Heights, Pune                     │
│ Rent: ₹25,000/month                                         │
│ Deposit: ₹50,000                                            │
│ Duration: 11 months                                         │
│                                                              │
│ ⚖️ Legal Compliance:                                        │
│    ✅ Maharashtra Rent Control Act, 1999                    │
│    ✅ Stamp Duty: ₹2,750 (calculated)                       │
│    ✅ No registration required (< 12 months)                │
│                                                              │
│ [📥 Download PDF]  [✍️ e-Sign]  [📜 e-Stamp]               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Talking Points:**
- "**Zero manual entry.** Her name, address, PAN—all auto-filled from verified government sources."
- "**Legal compliance built-in.** The agent applied Maharashtra Rent Control Act automatically."
- "**Cost savings.** Lawyer fees for this? ₹2,000-5,000. With NyayaSahayak? ₹0."

---

#### Scene 3: Technical Deep-Dive (60 seconds)

**Show Architecture Slide:**

```
┌─────────────────────────────────────────────────────────────┐
│                  THE MAGIC BEHIND THE SCENES                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │ DigiLock │───►│  Agent   │───►│ Legal RAG│             │
│   │   API    │    │ (Lang    │    │(Pinecone)│             │
│   │(Verified)│    │  Graph)  │    │(BNS, MVA)│             │
│   └──────────┘    └──────────┘    └──────────┘             │
│         │              │              │                     │
│         │              ▼              │                     │
│         │       ┌──────────┐          │                     │
│         └──────►│  Redis   │◄─────────┘                     │
│                 │(5min TTL)│                                │
│                 │ ZERO PII │                                │
│                 │RETENTION │                                │
│                 └──────────┘                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Key Talking Points:**
- "**DigiLocker API Setu** - Real government integration, not simulated"
- "**LangGraph Agent** - Not a chatbot. It makes decisions and takes actions"
- "**Legal RAG** - Pinecone indexed with BNS, Motor Vehicles Act, Rent Acts"
- "**Zero-Retention Privacy** - PII exists for 5 minutes max, then auto-deleted"

---

### Closing Impact (30 seconds)

**Show Impact Slide:**

```
┌─────────────────────────────────────────────────────────────┐
│                      THE IMPACT                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   BEFORE                    AFTER                           │
│   ──────                    ─────                           │
│   7 days                    5 minutes                       │
│   ₹5,000                    ₹0                              │
│   Confusion                 Clarity                         │
│   Anxiety                   Confidence                      │
│                                                              │
│   TARGET MARKET                                             │
│   • 150M+ DigiLocker users                                  │
│   • 70% face minor legal issues annually                    │
│   • ₹50,000 Cr+ lost to legal friction                     │
│                                                              │
│   OUR PROMISE                                               │
│   "From confusion to clarity in under a minute"             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Presenter:**
> "We're not building another chatbot. We're building an agent that acts on behalf of citizens—fetching verified data, applying real laws, and generating legally valid documents.
>
> **NyayaSahayak: Democratizing legal access, one minor case at a time.**"

---

## 🎨 Presentation Tips

### Do's ✅

- **Show, don't tell** - Demo the actual flow, not slides
- **Time it** - 5 minutes is short, practice religiously
- **Tell stories** - Rahul's traffic stop is more memorable than features
- **Highlight differentiators** - "Verified data" not "uploaded documents"

### Don'ts ❌

- **Don't read slides** - Know your content
- **Don't over-explain tech** - Judges care about impact, not implementation details
- **Don't rush the demo** - Better to show 2 flows well than 4 flows chaotically
- **Don't forget the "so what"** - Always tie back to user benefit

---

## 📱 Demo Environment Setup

### Prerequisites

```bash
# 1. Start backend
cd nyayasahayak
docker-compose up -d

# 2. Verify services
curl http://localhost:8000/health  # FastAPI
redis-cli ping                     # Redis
mongosh --eval "db.serverStatus()" # MongoDB

# 3. Start frontend
cd frontend
npm run dev

# 4. Test DigiLocker sandbox
curl http://localhost:8000/api/v1/digilocker/test
```

### Backup Plan

If live demo fails:
1. **Pre-recorded video** - Have a 2-minute video ready
2. **Screenshots** - Prepare annotated screenshots of each flow
3. **Mock responses** - Backend can return cached responses if APIs are down

---

## 🏆 Judging Criteria Alignment

| Criteria | How We Address It |
|----------|------------------|
| **Innovation** | First agentic AI using DigiLocker for legal workflows |
| **Impact** | 150M+ potential users, ₹50,000 Cr problem |
| **Technical Depth** | LangGraph, RAG, OAuth 2.0, Zero-Trust Privacy |
| **Feasibility** | Phased MVP, clear roadmap, existing APIs |
| **Scalability** | Serverless Pinecone, horizontal API scaling |

---

*Document prepared for hackathon submission - February 2026*
