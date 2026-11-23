# CourseConnect — API Endpoint Specifications

## Base URL
`/api`

## Health & Status
- `GET /api/health` — Platform health check, runtime status, and environment diagnostics.

## Auth & Profile (`/api/auth`)
- `GET /api/auth/me` — Return authenticated user profile and permissions from Supabase JWT.
- `POST /api/auth/sync-profile` — Synchronize profile after Supabase registration.

## Courses (`/api/courses`)
- `GET /api/courses` — List courses (filtered by user role and enrollment).
- `POST /api/courses` — Create new course (Faculty only).
- `GET /api/courses/:id` — Course details, CLOs, materials.
- `PUT /api/courses/:id` — Update course (Owner faculty only).
- `POST /api/courses/:id/enroll` — Request enrollment or join via code (Student).

## Learning Objectives (`/api/clos`)
- `GET /api/courses/:course_id/clos` — List CLOs for course.
- `POST /api/courses/:course_id/clos` — Create CLO manually.
- `POST /api/courses/:course_id/clos/ai-generate` — AI-generate CLOs from syllabus text.
- `PUT /api/clos/:id` — Update CLO.
- `DELETE /api/clos/:id` — Delete CLO.

## Materials (`/api/materials`)
- `GET /api/courses/:course_id/materials` — List published materials (or all for faculty).
- `POST /api/courses/:course_id/materials` — Upload material reference (Supabase storage path).
- `PATCH /api/materials/:id/publish` — Toggle publication status.

## Assessments (`/api/assessments`)
- `GET /api/courses/:course_id/assessments` — List assessments.
- `POST /api/assessments` — Create assessment.
- `POST /api/assessments/ai-generate` — Generate assessment from document chunk.
- `POST /api/assessments/:id/submit` — Submit student answers.
- `POST /api/submissions/:id/grade` — Finalize descriptive grading.

## Analytics (`/api/analytics`)
- `GET /api/analytics/faculty/course/:id` — Class-level CLO attainment, Bloom radar, weak objectives.
- `GET /api/analytics/student/course/:id` — Student-specific CLO attainment and progress report.

## Recommendations (`/api/recommendations`)
- `GET /api/recommendations/student/:course_id` — Personalized AI recommendations.
- `POST /api/recommendations/generate` — Trigger remediation engine for weak CLOs.
