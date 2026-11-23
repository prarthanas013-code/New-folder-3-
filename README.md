# CourseConnect 🎓

> **AI-Powered Course Learning Outcome Analysis Platform**  
> Connecting Faculty, Students, and Administrators to measure, analyze, and elevate academic achievement using Bloom's Taxonomy.

---

## Core Vision
CourseConnect answers three fundamental academic questions:
1. **What are students expected to learn?** (Syllabus-aligned Course Learning Objectives classified across Bloom's 6 Cognitive Levels)
2. **How effectively have students achieved the defined learning objectives?** (Granular, multi-tier CLO and Bloom-level attainment analytics)
3. **What should students do to improve their learning outcomes?** (Actionable, personalized AI-driven recommendations)

---

## Architecture & Technology Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router, Recharts, Lucide React
- **Backend:** Python Flask, Flask-CORS, Gunicorn, PyMuPDF, python-pptx, python-docx
- **Database & Auth:** Supabase PostgreSQL, Supabase Auth, Row-Level Security (RLS), Supabase Storage
- **AI Engine:** Google Gemini API with structured JSON output and deterministic rule-based fallbacks
- **Hosting:** Render (Static Site for React, Web Service for Flask)

---

## Project Structure
```
CourseConnect/
├── frontend/             # Vite + React 18 + Tailwind CSS client
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/  # Modular UI widgets
│       ├── pages/       # Admin, Faculty, Student, Auth, Landing
│       ├── layouts/     # Role-based dashboard layouts
│       ├── services/    # API & Supabase clients
│       └── utils/
├── backend/              # Python Flask API & Analytics Engine
│   ├── app/
│   │   ├── routes/      # REST API endpoints
│   │   ├── models/      # Data abstractions
│   │   ├── services/    # AI, Analytics & Document processors
│   │   ├── middleware/  # JWT Auth & Role validation
│   │   └── utils/
│   ├── config/          # Environment configuration
│   ├── requirements.txt
│   └── run.py           # Application entrypoint
├── database/             # PostgreSQL migrations & policies
│   ├── schema.sql
│   ├── policies.sql
│   └── seed.sql
├── docs/                 # Architectural specifications
│   ├── architecture.md
│   ├── database.md
│   └── api.md
├── DEVELOPMENT_LOG.md    # Incremental progress tracking
└── README.md
```

---

## Getting Started

### 1. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
python run.py
```
Backend will start on `http://localhost:5000`. Health check is available at `http://localhost:5000/api/health`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will launch on `http://localhost:5173`.
