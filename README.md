# 🏛️ NyayaSahayak

<div align="center">

**Agentic AI Legal Assistant for India's Minor Justice Gap**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DigiLocker](https://img.shields.io/badge/DigiLocker-Integrated-green.svg)](https://digilocker.gov.in)
[![Made in India](https://img.shields.io/badge/Made%20in-India-orange.svg)](https://www.india.gov.in)

*"From confusion to clarity in under a minute."*

</div>

---

## 🎯 The Problem

**70% of Indians** face at least one minor legal issue annually—traffic challans, rental agreements, affidavits, consumer complaints. Yet:

- ❌ Finding a lawyer for a ₹1,000 fine costs more than the fine itself
- ❌ Government documents are static and don't auto-fill legal forms
- ❌ Citizens don't know their rights or the laws that protect them

**Result:** People pay bribes, ignore rights, or sign unfair agreements.

---

## 💡 The Solution

NyayaSahayak is an **Agentic AI** that doesn't just give advice—it **acts**:

```
User: "Police stopped me for expired insurance"
          ↓
NyayaSahayak: 
  1. 🔐 Fetches insurance from DigiLocker (autonomously)
  2. ✅ Verifies validity (checks expiry date)
  3. ⚖️ Retrieves legal backing (IT Act Rule 9A)
  4. 📱 Displays verified proof + citation for officer
          ↓
Resolution: 30 seconds, zero stress
```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **🔐 DigiLocker Integration** | Autonomous document fetching—no uploads needed |
| **⚖️ Legal RAG** | Answers backed by BNS, Motor Vehicles Act, Rent Acts |
| **📄 Document Generation** | Rental agreements, affidavits auto-filled with verified data |
| **🔒 Zero-Retention Privacy** | PII exists for 5 minutes max, then auto-deleted |
| **🚗 On-Spot Assistance** | <10 second response for traffic stops |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      NyayaSahayak                             │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────┐   ┌─────────────┐   ┌─────────────┐            │
│  │DigiLock │──►│  LangGraph  │──►│  Pinecone   │            │
│  │er API   │   │  Agent      │   │  Legal RAG  │            │
│  └─────────┘   └─────────────┘   └─────────────┘            │
│       │              │                  │                    │
│       └──────────────┼──────────────────┘                    │
│                      ▼                                       │
│               ┌─────────────┐                                │
│               │   Redis     │                                │
│               │  (5min PII) │                                │
│               └─────────────┘                                │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [01 - Problem Statement](docs/01_PROBLEM_STATEMENT.md) | The "Minor Justice" gap in India |
| [02 - Solution Overview](docs/02_SOLUTION_OVERVIEW.md) | NyayaSahayak agent architecture |
| [03 - Technical Requirements](docs/03_TECHNICAL_REQUIREMENTS.md) | Detailed technical specifications |
| [04 - Use Cases](docs/04_USE_CASES.md) | Traffic stops, affidavits, rentals |
| [05 - MVP Roadmap](docs/05_MVP_ROADMAP.md) | Phased development plan |
| [06 - Architecture](docs/06_ARCHITECTURE.md) | System design & components |
| [07 - Privacy & Security](docs/07_PRIVACY_SECURITY.md) | DPDPA compliance, zero-retention |
| [08 - DigiLocker Integration](docs/08_DIGILOCKER_INTEGRATION.md) | OAuth flow, document parsing |
| [09 - Legal RAG](docs/09_LEGAL_RAG.md) | Vector search, citations |
| [10 - Demo Script](docs/10_DEMO_SCRIPT.md) | Presentation guide |
| [11 - Business Model](docs/11_BUSINESS_MODEL.md) | Revenue, market analysis |

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- MongoDB
- Redis
- DigiLocker API credentials (via API Setu)
- Pinecone account
- OpenAI/Google API key

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/nyayasahayak.git
cd nyayasahayak

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# Start services
docker-compose up -d  # MongoDB, Redis

# Run application
uvicorn app.main:app --reload
```

### Environment Variables

```env
# DigiLocker
DIGILOCKER_CLIENT_ID=your_client_id
DIGILOCKER_CLIENT_SECRET=your_client_secret
DIGILOCKER_REDIRECT_URI=http://localhost:8000/callback

# Database
MONGODB_URI=mongodb://localhost:27017/nyayasahayak
REDIS_URL=redis://localhost:6379

# Vector DB
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=nyayasahayak-legal

# LLM
OPENAI_API_KEY=your_openai_key
# OR
GOOGLE_API_KEY=your_google_key
```

---

## 📱 Use Cases

### 1. Traffic Stop Assistance
> Show valid insurance + legal citation in 30 seconds

### 2. Rental Agreement
> Auto-fill tenant details from DigiLocker, generate Maharashtra/Karnataka compliant agreement

### 3. Gap Certificate Affidavit
> Calculate gap years from marksheet, draft notary-ready affidavit

### 4. Wrong Challan Dispute
> OCR challan image, cross-reference with RC, generate dispute letter

---

## 🛡️ Privacy Commitment

- ✅ **Zero PII Persistence** - All personal data auto-deleted within 5 minutes
- ✅ **DPDPA 2023 Compliant** - Built with Indian data protection law in mind
- ✅ **Consent-Based Access** - DigiLocker OAuth ensures user control
- ✅ **Encrypted Everything** - AES-256-GCM at rest, TLS 1.3 in transit

---

## 🗺️ Roadmap

| Phase | Timeline | Deliverables |
|-------|----------|--------------|
| **Phase 1: The Reader** | Week 1-2 | DigiLocker integration, document parsing |
| **Phase 2: The Drafter** | Week 3-4 | Template engine, rental agreement generation |
| **Phase 3: The Lawyer** | Week 5-6 | Legal RAG, traffic assistance, guardrails |

---

## 📊 Impact

| Metric | Before | After |
|--------|--------|-------|
| Rental Agreement | 7 days, ₹5,000 | 5 minutes, ₹0 |
| Traffic Dispute | 2 hours, potential bribe | 30 seconds, legal backing |
| Affidavit | 3 days, ₹500 | 5 minutes, ₹0 (drafting) |

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [DigiLocker](https://digilocker.gov.in) - Government of India
- [API Setu](https://apisetu.gov.in) - API gateway for government services
- [LangChain/LangGraph](https://langchain.com) - Agent framework
- [Pinecone](https://pinecone.io) - Vector database

---

<div align="center">

**Built for India 🇮🇳 | Hackathon 2026**

*Democratizing legal access, one minor case at a time.*

</div>
