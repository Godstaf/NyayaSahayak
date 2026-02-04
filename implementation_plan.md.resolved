# NyayaSahayak - Backend & Database Architecture

## Executive Summary

This document outlines the complete backend and database architecture for NyayaSahayak, an Agentic AI Legal Assistant designed to automate minor legal workflows in India. The system integrates with DigiLocker for verified document fetching, uses RAG (Retrieval Augmented Generation) for legal reasoning, and provides real-time legal assistance.

---

## System Architecture Overview

```mermaid
flowchart TB
    subgraph Client["Client Layer"]
        WebApp["Web Application"]
        MobileApp["Mobile App"]
    end

    subgraph API["API Gateway"]
        FastAPI["FastAPI Server"]
        Auth["Auth Middleware"]
        RateLimiter["Rate Limiter"]
    end

    subgraph Agent["Agentic AI Core"]
        Orchestrator["LangGraph Orchestrator"]
        LLM["LLM (Gemini/GPT-4)"]
        Tools["Agent Tools"]
    end

    subgraph External["External Integrations"]
        DigiLocker["DigiLocker API"]
        ESign["e-Sign/e-Stamp API"]
        OCR["OCR Service"]
    end

    subgraph Storage["Data Layer"]
        MongoDB["MongoDB Atlas"]
        Pinecone["Pinecone Vector DB"]
        Redis["Redis Cache"]
    end

    WebApp --> FastAPI
    MobileApp --> FastAPI
    FastAPI --> Auth
    Auth --> RateLimiter
    RateLimiter --> Orchestrator
    Orchestrator --> LLM
    Orchestrator --> Tools
    Tools --> DigiLocker
    Tools --> ESign
    Tools --> OCR
    Tools --> MongoDB
    Tools --> Pinecone
    LLM --> Pinecone
    FastAPI --> Redis
```

---

## Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| **API Framework** | FastAPI | Async support, automatic OpenAPI docs, Python ecosystem |
| **Agent Framework** | LangGraph | Stateful agent orchestration, tool management, checkpointing |
| **LLM** | Google Gemini / OpenAI GPT-4 | Strong reasoning, function calling, multilingual |
| **Primary Database** | MongoDB Atlas | Flexible schema for documents, geospatial queries |
| **Vector Database** | Pinecone | Low latency, serverless, semantic search for legal RAG |
| **Cache** | Redis | Session management, ephemeral PII handling, rate limiting |
| **OCR** | Google Vision API | High accuracy for Indian documents, multilingual support |
| **Auth** | OAuth 2.0 + JWT | DigiLocker integration, stateless authentication |
| **Message Queue** | Redis Streams / RabbitMQ | Async document processing, notification handling |

---

## Database Architecture

### Database: MongoDB Atlas (Primary)

> [!IMPORTANT]
> **Zero-Retention Privacy Principle**: PII from DigiLocker is NEVER persisted to MongoDB. It is processed in Redis ephemeral memory only.

#### Collection Schema Overview

```mermaid
erDiagram
    USERS ||--o{ SESSIONS : has
    USERS ||--o{ DOCUMENTS : owns
    USERS ||--o{ AGENT_CONVERSATIONS : initiates
    AGENT_CONVERSATIONS ||--o{ AGENT_MESSAGES : contains
    AGENT_CONVERSATIONS ||--o{ AGENT_TOOL_CALLS : logs
    DOCUMENTS ||--o{ GENERATED_LEGAL_DOCS : produces
    LEGAL_TEMPLATES ||--o{ GENERATED_LEGAL_DOCS : uses
    
    USERS {
        ObjectId _id PK
        string phone_number UK
        string email
        string digilocker_id
        boolean is_verified
        datetime created_at
        datetime last_active
        object preferences
    }

    SESSIONS {
        ObjectId _id PK
        ObjectId user_id FK
        string access_token
        string refresh_token
        datetime expires_at
        string device_info
    }

    DOCUMENTS {
        ObjectId _id PK
        ObjectId user_id FK
        string doc_type
        string doc_reference_id
        datetime fetched_at
        datetime expires_at
        boolean is_valid
        object metadata_non_pii
    }

    AGENT_CONVERSATIONS {
        ObjectId _id PK
        ObjectId user_id FK
        string intent
        string status
        datetime started_at
        datetime ended_at
        array tool_calls
        object final_output
    }

    AGENT_MESSAGES {
        ObjectId _id PK
        ObjectId conversation_id FK
        string role
        string content
        datetime timestamp
    }

    AGENT_TOOL_CALLS {
        ObjectId _id PK
        ObjectId conversation_id FK
        string tool_name
        object input_params_sanitized
        object output_summary
        datetime executed_at
        int latency_ms
    }

    LEGAL_TEMPLATES {
        ObjectId _id PK
        string template_name
        string category
        array applicable_states
        string template_content
        array required_fields
        string version
        datetime updated_at
    }

    GENERATED_LEGAL_DOCS {
        ObjectId _id PK
        ObjectId user_id FK
        ObjectId template_id FK
        ObjectId conversation_id FK
        string doc_type
        string file_url
        string status
        datetime generated_at
        object esign_details
    }
```

---

### Detailed Collection Schemas

#### 1. `users` Collection

```javascript
{
  "_id": ObjectId("..."),
  "phone_number": "+919876543210",          // Primary identifier (hashed for storage)
  "phone_hash": "sha256_hash_of_phone",     // For lookup without exposing number
  "email": "user@email.com",                // Optional, encrypted at rest
  "digilocker": {
    "linked": true,
    "linked_at": ISODate("2026-01-15T10:30:00Z"),
    "consent_valid_until": ISODate("2026-07-15T10:30:00Z")
  },
  "kyc_status": "verified",                  // "pending" | "verified" | "failed"
  "preferences": {
    "language": "hi",                        // Hindi/English
    "state": "Maharashtra",                  // For jurisdiction-specific advice
    "notification_channel": "whatsapp"
  },
  "created_at": ISODate("2026-01-10T08:00:00Z"),
  "updated_at": ISODate("2026-02-01T12:00:00Z"),
  "last_active": ISODate("2026-02-04T18:00:00Z"),
  "is_active": true
}
```

**Indexes:**
```javascript
db.users.createIndex({ "phone_hash": 1 }, { unique: true })
db.users.createIndex({ "email": 1 }, { sparse: true })
db.users.createIndex({ "digilocker.linked": 1, "kyc_status": 1 })
```

---

#### 2. `document_metadata` Collection

> [!CAUTION]
> This collection stores ONLY non-PII metadata about fetched documents. Actual document content is processed in ephemeral memory.

```javascript
{
  "_id": ObjectId("..."),
  "user_id": ObjectId("..."),
  "document_type": "DRIVING_LICENSE",        // AADHAR | PAN | DL | RC | INSURANCE | MARKSHEET
  "digilocker_uri": "in.gov.dl-123456",      // DigiLocker document URI
  "issuer": "Transport Department, Maharashtra",
  "fetch_history": [
    {
      "fetched_at": ISODate("2026-02-04T10:00:00Z"),
      "purpose": "rental_agreement_verification",
      "success": true
    }
  ],
  "validity": {
    "issue_date": ISODate("2020-05-15"),
    "expiry_date": ISODate("2040-05-14"),
    "is_currently_valid": true
  },
  "last_verified_at": ISODate("2026-02-04T10:00:00Z"),
  "checksum": "sha256_of_doc_content"        // For integrity verification
}
```

**Indexes:**
```javascript
db.document_metadata.createIndex({ "user_id": 1, "document_type": 1 })
db.document_metadata.createIndex({ "validity.expiry_date": 1 })
```

---

#### 3. `agent_conversations` Collection

```javascript
{
  "_id": ObjectId("..."),
  "user_id": ObjectId("..."),
  "session_id": "sess_abc123",
  "intent": {
    "primary": "rental_agreement",           // Detected intent
    "sub_intent": "draft_new",
    "confidence": 0.95
  },
  "context": {
    "jurisdiction": "Maharashtra",
    "applicable_acts": ["Maharashtra Rent Control Act, 1999"],
    "documents_required": ["AADHAR", "PAN"],
    "documents_fetched": ["AADHAR"]
  },
  "state_machine": {
    "current_state": "document_verification",
    // States: init -> document_fetch -> document_verification -> 
    //         legal_reasoning -> draft_generation -> user_review -> complete
    "state_history": [
      { "state": "init", "entered_at": ISODate("..."), "exited_at": ISODate("...") },
      { "state": "document_fetch", "entered_at": ISODate("...") }
    ]
  },
  "output": {
    "generated_doc_id": ObjectId("..."),
    "legal_citations": [
      {
        "act": "Maharashtra Rent Control Act, 1999",
        "section": "Section 15",
        "relevance": "Standard rent determination"
      }
    ]
  },
  "status": "in_progress",                   // "in_progress" | "completed" | "failed" | "awaiting_user"
  "started_at": ISODate("2026-02-04T17:00:00Z"),
  "ended_at": null,
  "total_llm_tokens": 2450,
  "total_latency_ms": 4200
}
```

**Indexes:**
```javascript
db.agent_conversations.createIndex({ "user_id": 1, "started_at": -1 })
db.agent_conversations.createIndex({ "status": 1 })
db.agent_conversations.createIndex({ "intent.primary": 1 })
```

---

#### 4. `agent_messages` Collection

```javascript
{
  "_id": ObjectId("..."),
  "conversation_id": ObjectId("..."),
  "sequence": 1,                             // Message order
  "role": "user",                            // "user" | "assistant" | "system" | "tool"
  "content": "I need a rental agreement for my flat in Pune",
  "content_type": "text",                    // "text" | "image" | "document"
  "attachments": [],
  "metadata": {
    "tokens": 15,
    "language_detected": "en"
  },
  "timestamp": ISODate("2026-02-04T17:00:00Z")
}
```

---

#### 5. `agent_tool_calls` Collection

```javascript
{
  "_id": ObjectId("..."),
  "conversation_id": ObjectId("..."),
  "tool_name": "fetch_digilocker_document",
  "tool_category": "data_fetch",             // "data_fetch" | "legal_search" | "document_gen" | "ocr"
  "input_params": {
    "document_type": "AADHAR",
    "purpose": "identity_verification"
    // Note: No actual PII stored
  },
  "output_summary": {
    "success": true,
    "document_valid": true,
    "fields_extracted": ["name", "address", "dob"]  // Field names only, not values
  },
  "error": null,
  "executed_at": ISODate("2026-02-04T17:00:05Z"),
  "latency_ms": 1200,
  "retries": 0
}
```

---

#### 6. `legal_templates` Collection

```javascript
{
  "_id": ObjectId("..."),
  "template_id": "rental_agreement_mh_v2",
  "name": "Rental Agreement - Maharashtra",
  "category": "property",                    // "property" | "affidavit" | "consumer" | "traffic"
  "applicable_states": ["Maharashtra"],
  "applicable_acts": [
    {
      "name": "Maharashtra Rent Control Act, 1999",
      "sections": ["15", "16", "55"]
    }
  ],
  "template_content": "...",                 // Jinja2/Mustache template
  "required_fields": [
    {
      "field_name": "landlord_name",
      "source": "user_input",
      "validation": "string",
      "required": true
    },
    {
      "field_name": "tenant_address",
      "source": "digilocker:AADHAR",
      "field_path": "address",
      "validation": "string",
      "required": true
    }
  ],
  "stamp_duty": {
    "percentage": 0.25,
    "min_amount": 100,
    "max_amount": 50000
  },
  "version": "2.0",
  "is_active": true,
  "created_at": ISODate("2025-06-01"),
  "updated_at": ISODate("2026-01-15")
}
```

---

#### 7. `generated_legal_documents` Collection

```javascript
{
  "_id": ObjectId("..."),
  "user_id": ObjectId("..."),
  "template_id": ObjectId("..."),
  "conversation_id": ObjectId("..."),
  "document_type": "rental_agreement",
  "title": "Rental Agreement - Flat 302, Kumar Heights, Pune",
  "file": {
    "storage_url": "s3://nyayasahayak-docs/user123/ra_2026020401.pdf",
    "checksum": "sha256_hash",
    "size_bytes": 245000,
    "generated_at": ISODate("2026-02-04T17:15:00Z")
  },
  "filled_fields": {
    // Sanitized - no actual values, just confirmation
    "landlord_name": "[FILLED]",
    "tenant_name": "[FROM_DIGILOCKER]",
    "property_address": "[USER_INPUT]"
  },
  "legal_citations_embedded": [
    "Maharashtra Rent Control Act, Section 15"
  ],
  "status": "draft",                         // "draft" | "pending_esign" | "signed" | "registered"
  "esign": {
    "provider": "esign.gov.in",
    "initiated_at": null,
    "completed_at": null,
    "certificate_id": null
  },
  "estamp": {
    "required": true,
    "amount": 500,
    "paid": false,
    "estamp_id": null
  },
  "expires_at": ISODate("2026-02-11T17:15:00Z"),  // 7-day expiry for drafts
  "created_at": ISODate("2026-02-04T17:15:00Z")
}
```

---

#### 8. `legal_knowledge_base` Collection (For RAG Sync)

```javascript
{
  "_id": ObjectId("..."),
  "act_name": "Motor Vehicles Act, 1988",
  "section": "Section 130",
  "title": "Display of Insurance Certificate",
  "content": "Every owner of a motor vehicle...",
  "keywords": ["insurance", "display", "certificate", "penalty"],
  "amendments": [
    {
      "amendment_act": "Motor Vehicles (Amendment) Act, 2019",
      "effective_from": ISODate("2019-09-01"),
      "changes": "Penalty increased to Rs. 2000"
    }
  ],
  "pinecone_vector_id": "mv_act_s130_v1",
  "last_synced_at": ISODate("2026-01-01"),
  "is_active": true
}
```

---

### Database: Pinecone (Vector Store)

#### Index Configuration

```yaml
Index Name: nyayasahayak-legal-index
Dimension: 1536  # text-embedding-3-small
Metric: cosine
Pod Type: s1.x1  # Serverless

Namespaces:
  - bns_2023            # Bharatiya Nyaya Sanhita
  - motor_vehicles_act
  - consumer_protection_act
  - rent_control_acts
  - case_law_precedents
```

#### Vector Metadata Schema

```json
{
  "id": "bns_s103_v1",
  "values": [0.023, -0.045, ...],  // 1536 dimensions
  "metadata": {
    "act": "Bharatiya Nyaya Sanhita, 2023",
    "section": "103",
    "title": "Punishment for murder",
    "category": "criminal",
    "keywords": ["murder", "death", "punishment", "life imprisonment"],
    "state": "central",  // "central" or specific state
    "effective_date": "2024-07-01",
    "chunk_index": 0,
    "total_chunks": 1
  }
}
```

---

### Database: Redis (Ephemeral Store)

> [!WARNING]
> Redis is used for ephemeral PII storage. All keys have mandatory TTL (max 1 hour). No persistence is enabled.

#### Key Patterns

| Pattern | Purpose | TTL |
|---------|---------|-----|
| `session:{session_id}` | User session data | 24h |
| `pii:{user_id}:{request_id}` | Ephemeral PII from DigiLocker | 5 min |
| `rate_limit:{user_id}` | Rate limiting counter | 1 min |
| `agent_state:{conversation_id}` | LangGraph checkpoint | 1h |
| `cache:legal:{query_hash}` | Cached legal search results | 24h |
| `lock:doc_gen:{user_id}` | Distributed lock for doc generation | 5 min |

#### Ephemeral PII Structure

```json
// Key: pii:user123:req_abc123
// TTL: 300 seconds (5 minutes)
{
  "aadhaar": {
    "name": "Rahul Sharma",
    "address": "Flat 102, ...",
    "dob": "1990-05-15",
    "masked_number": "XXXX-XXXX-1234"
  },
  "fetched_at": "2026-02-04T17:00:00Z",
  "purpose": "rental_agreement",
  "consent_id": "consent_xyz789"
}
```

---

## Backend API Architecture

### Project Structure

```
nyayasahayak/
├── app/
│   ├── __init__.py
│   ├── main.py                     # FastAPI application entry
│   ├── config.py                   # Environment configuration
│   ├── dependencies.py             # Dependency injection
│   │
│   ├── api/                        # API Routes
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py             # Authentication endpoints
│   │   │   ├── digilocker.py       # DigiLocker integration
│   │   │   ├── agent.py            # Agent conversation endpoints
│   │   │   ├── documents.py        # Document management
│   │   │   └── templates.py        # Legal templates
│   │   └── router.py
│   │
│   ├── core/                       # Core business logic
│   │   ├── __init__.py
│   │   ├── security.py             # JWT, encryption, hashing
│   │   ├── digilocker_client.py    # DigiLocker API wrapper
│   │   └── privacy.py              # PII handling utilities
│   │
│   ├── agent/                      # Agentic AI components
│   │   ├── __init__.py
│   │   ├── orchestrator.py         # LangGraph state machine
│   │   ├── tools/
│   │   │   ├── __init__.py
│   │   │   ├── digilocker_tool.py  # Fetch DigiLocker docs
│   │   │   ├── legal_search_tool.py # RAG search
│   │   │   ├── ocr_tool.py         # Document OCR
│   │   │   └── document_gen_tool.py # Generate legal docs
│   │   ├── prompts/
│   │   │   ├── system_prompts.py
│   │   │   └── templates/
│   │   └── guardrails.py           # Hallucination detection
│   │
│   ├── db/                         # Database layer
│   │   ├── __init__.py
│   │   ├── mongodb.py              # MongoDB connection
│   │   ├── redis_client.py         # Redis connection
│   │   ├── pinecone_client.py      # Vector DB connection
│   │   └── repositories/
│   │       ├── __init__.py
│   │       ├── user_repo.py
│   │       ├── conversation_repo.py
│   │       └── document_repo.py
│   │
│   ├── models/                     # Pydantic models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── conversation.py
│   │   ├── document.py
│   │   └── legal_template.py
│   │
│   ├── services/                   # Business services
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── agent_service.py
│   │   ├── document_service.py
│   │   └── legal_rag_service.py
│   │
│   └── utils/
│       ├── __init__.py
│       ├── validators.py
│       └── formatters.py
│
├── legal_data/                     # Legal knowledge ingestion
│   ├── scripts/
│   │   ├── ingest_bns.py
│   │   ├── ingest_mv_act.py
│   │   └── sync_pinecone.py
│   └── raw_data/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── .env.example
```

---

### API Endpoints

#### Authentication & DigiLocker

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/send-otp` | Send OTP to phone |
| `POST` | `/api/v1/auth/verify-otp` | Verify OTP, return JWT |
| `POST` | `/api/v1/auth/refresh` | Refresh access token |
| `GET` | `/api/v1/digilocker/auth-url` | Get DigiLocker OAuth URL |
| `GET` | `/api/v1/digilocker/callback` | OAuth callback handler |
| `POST` | `/api/v1/digilocker/fetch-document` | Fetch specific document |
| `GET` | `/api/v1/digilocker/available-documents` | List user's available docs |

#### Agent Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/agent/chat` | Send message to agent |
| `GET` | `/api/v1/agent/conversations` | List user's conversations |
| `GET` | `/api/v1/agent/conversations/{id}` | Get conversation details |
| `POST` | `/api/v1/agent/conversations/{id}/continue` | Resume conversation |
| `POST` | `/api/v1/agent/upload-image` | Upload image for OCR |

#### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/documents` | List generated documents |
| `GET` | `/api/v1/documents/{id}` | Get document details |
| `GET` | `/api/v1/documents/{id}/download` | Download PDF |
| `POST` | `/api/v1/documents/{id}/esign` | Initiate e-Sign |
| `GET` | `/api/v1/templates` | List available templates |
| `GET` | `/api/v1/templates/{id}` | Get template details |

---

### DigiLocker Integration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DL as DigiLocker API
    participant R as Redis

    U->>F: Click "Link DigiLocker"
    F->>B: GET /digilocker/auth-url
    B->>B: Generate state, PKCE
    B->>R: Store state (TTL: 10min)
    B-->>F: DigiLocker OAuth URL
    F->>DL: Redirect to DigiLocker
    U->>DL: Login & Grant Consent
    DL->>B: Callback with auth code
    B->>R: Verify state
    B->>DL: Exchange code for tokens
    DL-->>B: Access token, refresh token
    B->>R: Store tokens (encrypted, TTL: 1hr)
    B-->>F: Success, redirect to app
    
    Note over U,R: Later: Document Fetch
    U->>F: "I need a rental agreement"
    F->>B: POST /agent/chat
    B->>B: Agent determines: need Aadhaar
    B->>R: Get DigiLocker tokens
    B->>DL: GET /pull/aadhaar
    DL-->>B: Aadhaar XML data
    B->>R: Store PII (TTL: 5min)
    B->>B: Agent processes, drafts doc
    B->>R: Delete PII
    B-->>F: Response with draft
```

---

### Agent State Machine (LangGraph)

```mermaid
stateDiagram-v2
    [*] --> Init: User message
    Init --> IntentClassification: Parse input
    
    IntentClassification --> DocumentFetch: Needs verification
    IntentClassification --> LegalSearch: Question about law
    IntentClassification --> OCRProcess: Image uploaded
    
    DocumentFetch --> DocumentVerification: Docs fetched
    DocumentFetch --> AwaitingConsent: No consent
    AwaitingConsent --> DocumentFetch: Consent granted
    
    DocumentVerification --> LegalReasoning: Docs valid
    DocumentVerification --> ErrorState: Docs invalid
    
    OCRProcess --> DocumentVerification: Text extracted
    
    LegalReasoning --> DraftGeneration: Template match
    LegalReasoning --> Response: Answer question
    
    LegalSearch --> LegalReasoning: Context found
    LegalSearch --> Fallback: Low confidence
    
    DraftGeneration --> UserReview: Draft ready
    UserReview --> ESign: User approves
    UserReview --> DraftGeneration: User requests changes
    
    ESign --> Complete: Signed
    Response --> [*]
    Complete --> [*]
    Fallback --> [*]: Suggest human lawyer
    ErrorState --> [*]
```

---

## Security Architecture

### Data Flow Classification

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA CLASSIFICATION                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐            │
│  │   RED ZONE   │   │ YELLOW ZONE  │   │  GREEN ZONE  │            │
│  │   (PII)      │   │ (Sensitive)  │   │  (General)   │            │
│  ├──────────────┤   ├──────────────┤   ├──────────────┤            │
│  │ • Aadhaar #  │   │ • Phone hash │   │ • Template   │            │
│  │ • Full name  │   │ • Email      │   │ • Metadata   │            │
│  │ • Address    │   │ • Doc URIs   │   │ • Intent     │            │
│  │ • DOB        │   │ • Consent ID │   │ • Status     │            │
│  │ • Photo      │   │ • Session ID │   │ • Timestamps │            │
│  ├──────────────┤   ├──────────────┤   ├──────────────┤            │
│  │ Storage:     │   │ Storage:     │   │ Storage:     │            │
│  │ Redis ONLY   │   │ MongoDB      │   │ MongoDB      │            │
│  │ (5min TTL)   │   │ (encrypted)  │   │ (plain)      │            │
│  │ No logging   │   │ Audit logged │   │ Full logging │            │
│  └──────────────┘   └──────────────┘   └──────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Encryption Standards

| Data Type | At Rest | In Transit | Key Rotation |
|-----------|---------|------------|--------------|
| DigiLocker Tokens | AES-256-GCM | TLS 1.3 | 24 hours |
| PII (Ephemeral) | Not stored | TLS 1.3 | N/A |
| User Credentials | Argon2id hash | TLS 1.3 | N/A |
| Generated Documents | AES-256-GCM | TLS 1.3 | 90 days |

---

## MVP Phased Implementat Implementation

### Phase 1: The Reader (Week 1-2)
- [ ] FastAPI project setup with MongoDB & Redis
- [ ] DigiLocker OAuth 2.0 integration
- [ ] Fetch and parse Aadhaar, PAN, DL documents
- [ ] Display verified user details in JSON format
- [ ] Ephemeral PII handling with Redis

### Phase 2: The Drafter (Week 3-4)
- [ ] LangGraph orchestrator setup
- [ ] Rental Agreement template with field mapping
- [ ] Auto-populate from DigiLocker data
- [ ] PDF generation service
- [ ] Basic conversation storage

### Phase 3: The Lawyer (Week 5-6)
- [ ] Pinecone vector DB setup
- [ ] Ingest BNS, Motor Vehicles Act, Rent Acts
- [ ] Legal RAG with citation generation
- [ ] "On-spot" traffic stop assistance
- [ ] Hallucination guardrails

---

## Verification Approach

Since this is an architecture design document, verification will be:

1. **User Review**: Architecture review with stakeholder feedback
2. **Prototype Validation**: After implementation, validate against this design
3. **Security Audit**: Review PII handling against DPDP Act compliance

---

## Document Links

- [DigiLocker API Documentation](https://apisetu.gov.in/directory/digilocker)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Pinecone Vector Database](https://www.pinecone.io/)
