# NyayaSahayak

Agentic AI Legal Assistant that automates the entire lifecycle of minor legal workflows. Unlike a chatbot that just "gives advice," this Agent acts as a proxy for the user, capable of fetching data, making decisions based on laws, and executing tasks.

---

### **1. Problem Statement**

**The Core Conflict: The "Minor Justice" Gap**
In India, the legal system is often perceived as a behemoth reserved for major crimes or corporate disputes. For the average citizen, "minor" legal affairs—traffic challans, rental agreements, affidavits, name changes, or consumer complaints—are sources of immense friction.

* **The Accessibility Friction:** Finding a lawyer for a ₹1,000 traffic fine or a simple rent agreement is time-consuming and often costs more than the issue itself.
* **The Data Silo:** Citizens have their verified identity documents (Aadhaar, PAN, Driving License) in DigiLocker, but these documents are static. They don't "talk" to legal forms. A user has to manually download, print, and re-enter data, leading to errors and inertia.
* **The "On-Spot" Paralysis:** When a citizen is stopped by traffic police or denied a service, they lack immediate, verified legal backing. They don't know the specific section of the Motor Vehicles Act or the Consumer Protection Act that applies *right now*, based on the documents they *actually hold*.

**The Consequence**
Citizens often pay bribes, ignore rights, or sign unfair agreements simply because the "activation energy" to access legal help is too high.

---

### **2. Proposed Solution: The "NyayaSahayak" Agent**

We propose an **Agentic AI Legal Assistant** that automates the *entire lifecycle* of minor legal workflows. Unlike a chatbot that just "gives advice," this Agent acts as a proxy for the user, capable of fetching data, making decisions based on laws, and executing tasks.

#### **Core Concept: The "Verify-then-Act" Loop**

The Agent does not just hallucinate a draft; it grounds every action in **verified state data** (via DigiLocker) and **codified law** (BNS/Consumer Acts).

#### **Detailed Workflow (Agentic Architecture)**

1. **Trigger (Perception):** User says, *"I need a rental agreement for my new flat in Pune"* or *"I just got a wrong challan for speeding."*
2. **Autonomous Verification (Tool Use):**
* The Agent requests permission to access DigiLocker.
* It **autonomously calls the DigiLocker API** to fetch the user's Aadhaar (for address/ID) and PAN (for financial validation).
* *Crucial Difference:* The user does not upload files. The Agent pulls verified XML data directly from the source.


3. **Legal Reasoning (The Brain):**
* The Agent identifies the jurisdiction (Maharashtra Rent Control Act).
* It checks the extracted DigiLocker data against legal requirements (e.g., "Is the user of legal age?" "Does the address match?").


4. **Execution (Action):**
* The Agent auto-populates the legal template with 100% accuracy using the fetched data.
* It generates a PDF ready for e-signing or e-Stamping.



---

### **3. Necessary Requirements**

To build this, you need a stack that supports **secure data handling**, **agentic orchestration**, and **legal accuracy**.

#### **A. Functional Requirements (The "Must-Haves")**

* **DigiLocker Integration (API Setu):**
* **OAuth 2.0 Auth Flow:** To securely gain user consent without storing their credentials.
* **Document Fetching:** Ability to parse specific document types (Aadhaar, DL, RC, PAN, Class X Marksheet) in XML/JSON format, not just PDF, for machine readability.


* **Agent Orchestrator:** A framework (e.g., LangChain, LangGraph, or AutoGen) to manage the state. The agent needs to know: *Did I fetch the doc? Yes. Did I validate it? No. -> Go validate.*
* **Vector Database (RAG):** A database (Pinecone/Milvus) indexed with:
* Bharatiya Nyaya Sanhita (BNS).
* Motor Vehicles Act.
* Consumer Protection Act.
* Rent Control Acts of major states.


* **OCR & Multimodal Input:** The ability for a user to upload a photo of a physical notice or challan, which the agent can read and cross-reference with DigiLocker data (e.g., matching the vehicle number on the challan to the RC in the locker).

#### **B. Non-Functional Requirements (The "Constraints")**

* **Zero-Retention Privacy (Crucial):** The Agent must process DigiLocker data in ephemeral memory (RAM) only. PII (Personally Identifiable Information) should never be written to your database logs.
* **Hallucination Guardrails:** The legal advice must cite the specific Act/Section. If the confidence is low, the Agent must fallback to "Please consult a human lawyer."
* **Latency:** "On-spot" means <10 seconds response time for retrieving a doc and citing a rule.

---

### **4. Detailed Use Case Examples**

**Scenario A: The Traffic Stop**

* **User:** "Police stopped me for no insurance, but I think it's valid."
* **Agent Action:**
1. Immediately queries DigiLocker for `Insurance Policy Document`.
2. Checks `Expiry Date` field in the metadata.
3. **Output:** Displays the valid certificate instantly on screen *and* generates a specific legal citation: *"Officer, under Section [X] of the Motor Vehicles Act, a digital copy from DigiLocker is legally equivalent to the original as per Rule 9A of the IT Rules."*



**Scenario B: The "Instant" Affidavit**

* **User:** "I need a gap certificate affidavit for my college admission."
* **Agent Action:**
1. Fetches `Class XII Marksheet` (to verify passing year) and `Aadhaar` (for name/address).
2. Calculates the gap years automatically (Current Year - Passing Year).
3. Drafts the affidavit on a stamp paper template.
4. **Output:** "Here is your affidavit. The gap is calculated as 2 years based on your 2024 marksheet. Ready to print."



---

### **5. Roadmap to MVP**

1. **Phase 1 (The Reader):** Build a module that strictly authenticates with DigiLocker and prints out the user's verified details in JSON format.
2. **Phase 2 (The Drafter):** Connect the JSON output to a "Rental Agreement" prompt template.
3. **Phase 3 (The Lawyer):** Integrate the Legal RAG (Retrieval Augmented Generation) to answer questions based on the *content* of the documents.
