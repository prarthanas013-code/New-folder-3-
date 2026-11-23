# CourseConnect — System Architecture Documentation

## 1. High-Level Architecture
CourseConnect operates as a decoupled full-stack platform:
1. **Client Tier (Frontend):** React.js single-page application built with Vite and Tailwind CSS. Provides specialized dashboard experiences for Administrator, Faculty, and Student roles.
2. **Application Tier (Backend API & Analytics Engine):** Python Flask REST API responsible for business logic, document chunking/extraction (PyMuPDF, python-pptx, python-docx), assessment evaluation, and CLO attainment calculations.
3. **Database & Storage Tier:** Supabase PostgreSQL with Row Level Security (RLS), Supabase Auth for identity management, and Supabase Storage for secure course material distribution.
4. **AI Intelligence Tier:** Google Gemini API integrated via Flask backend for learning objective generation, rubric-guided question generation, descriptive assessment evaluation, and personalized remediation paths.

```
       +---------------------------------------------+
       |             Client Layer (React)            |
       |    [Admin Portal]  [Faculty]  [Student]     |
       +---------------------+-----------------------+
                             | HTTPS / REST
                             v
       +---------------------------------------------+
       |             Flask Backend API               |
       |  - Auth Middleware & Role Verifier          |
       |  - Document Extraction (PyMuPDF/docx/pptx)  |
       |  - CLO Analytics Engine (Attainment %)      |
       |  - Gemini AI Client + Deterministic Fallback|
       +----------+--------------------+-------------+
                  |                    |
        Postgres / RLS / Storage       | REST JSON
                  v                    v
       +----------------------+  +-------------------+
       |     Supabase         |  |   Gemini 1.5/2.0  |
       |  - PostgreSQL DB     |  |   Generative AI   |
       |  - Auth (JWT)        |  +-------------------+
       |  - Storage Buckets   |
       +----------------------+
```

## 2. Core Modules
- **Authentication & RBAC:** Supabase JWT validation on every protected backend route, verifying role claims (`admin`, `faculty`, `student`).
- **Course & CLO Management:** Hierarchical mapping of Courses -> Learning Objectives -> Bloom's Cognitive Levels (Remember, Understand, Apply, Analyze, Evaluate, Create).
- **Assessment Management:** MCQ and descriptive assessment engines with strict deadline timers and mark allocations mapped to specific CLOs.
- **Outcome Analysis Engine:** Formulaic computation of student-level and class-level CLO attainment, target threshold achievements, and Bloom radar distributions.
- **Recommendation Engine:** Rule-based detection of underperforming CLOs coupled with AI-generated remedial study directives.
