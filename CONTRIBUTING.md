# Contributing to NyayaSahayak

Thank you for your interest in contributing to NyayaSahayak! This document provides guidelines and instructions for contributing.

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ (for frontend)
- Docker & Docker Compose
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/nyayasahayak.git
cd nyayasahayak

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies

# Setup pre-commit hooks
pre-commit install

# Copy environment variables
cp .env.example .env
# Edit .env with your development credentials

# Start local services
docker-compose up -d

# Run the application
uvicorn app.main:app --reload
```

---

## 📁 Project Structure

```
nyayasahayak/
├── app/                    # Main application code
│   ├── api/               # API endpoints
│   ├── agent/             # Agentic AI components
│   ├── core/              # Core business logic
│   ├── db/                # Database layer
│   ├── models/            # Pydantic models
│   └── services/          # Business services
├── docs/                   # Documentation
├── legal_data/            # Legal knowledge ingestion
├── tests/                 # Test suite
├── frontend/              # Frontend application
└── scripts/               # Utility scripts
```

---

## 🔧 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Follow the code style guidelines (see below)
- Write tests for new functionality
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run unit tests
pytest tests/unit

# Run integration tests
pytest tests/integration

# Run linting
ruff check app/
mypy app/

# Run all checks
make check
```

### 4. Commit

```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📝 Code Style Guidelines

### Python

- Follow PEP 8
- Use type hints
- Maximum line length: 100 characters
- Use docstrings for public functions/classes

```python
async def fetch_document(
    user_id: str,
    doc_type: DocumentType
) -> Document:
    """Fetch a document from DigiLocker.
    
    Args:
        user_id: The unique identifier of the user.
        doc_type: The type of document to fetch.
        
    Returns:
        The fetched Document object.
        
    Raises:
        DigiLockerError: If the document cannot be fetched.
    """
    ...
```

### TypeScript/JavaScript (Frontend)

- Use ESLint configuration
- Prefer functional components with hooks
- Use TypeScript for type safety

---

## ⚠️ Important Guidelines

### Privacy & Security

> **CRITICAL:** Never log or persist PII (Personally Identifiable Information)

- All DigiLocker data must be processed ephemerally
- Use the `EphemeralPIIStore` for any PII
- Do not add PII to error messages or logs
- Run security checks: `make security-check`

### Legal Content

- All legal citations must be verified
- Use the guardrails system for any legal output
- When in doubt, add a disclaimer

---

## 🧪 Testing

### Test Structure

```
tests/
├── unit/                  # Unit tests
│   ├── test_agent.py
│   ├── test_digilocker.py
│   └── test_legal_rag.py
├── integration/           # Integration tests
│   ├── test_api.py
│   └── test_document_flow.py
└── e2e/                   # End-to-end tests
    └── test_user_flows.py
```

### Running Tests

```bash
# All tests
pytest

# With coverage
pytest --cov=app --cov-report=html

# Specific test file
pytest tests/unit/test_agent.py

# Specific test function
pytest tests/unit/test_agent.py::test_intent_parsing
```

---

## 📚 Documentation

When adding new features, please update:

1. **Code docstrings** - For all public APIs
2. **API documentation** - OpenAPI/Swagger specs
3. **User documentation** - If it affects users
4. **Architecture docs** - If it changes system design

---

## 🤝 Code Review Process

1. All PRs require at least one approval
2. CI checks must pass
3. No decrease in test coverage
4. Security review for sensitive changes

---

## 📞 Getting Help

- **Issues:** Use GitHub Issues for bugs/features
- **Discussions:** Use GitHub Discussions for questions
- **Discord:** Join our community (link in README)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to NyayaSahayak! 🙏
