# CourseConnect — Database Design & Schema Specifications

## Tables Overview (14 Core PostgreSQL Entities)
1. `profiles`: Extended user records tied to `auth.users` (id, email, full_name, role, avatar_url, created_at).
2. `courses`: Academic courses (id, code, title, description, semester, academic_year, syllabus_url, enrollment_code, faculty_id, is_archived, created_at).
3. `enrollments`: Student course enrollment tracker (id, course_id, student_id, status: pending/approved/rejected/active, requested_at, updated_at).
4. `learning_objectives`: Course Learning Objectives with Bloom's level (id, course_id, code, description, bloom_level, action_verb, target_percentage, status, created_at).
5. `materials`: Learning resources & files (id, course_id, faculty_id, title, description, storage_path, file_type, file_size, is_published, created_at, published_at).
6. `assessments`: Quizzes and exams (id, course_id, faculty_id, title, instructions, duration_minutes, start_time, end_time, max_marks, attempt_limit, is_published, created_at).
7. `questions`: Individual assessment questions (id, assessment_id, question_text, question_type: mcq/descriptive, options, correct_answer, model_answer, max_marks, difficulty, explanation, created_at).
8. `question_objectives`: Question to CLO mapping with mark weighting (id, question_id, objective_id, weight_percentage, allocated_marks).
9. `submissions`: Student assessment submissions (id, assessment_id, student_id, attempt_number, start_time, submitted_at, total_score, is_finalized, created_at).
10. `answers`: Student question answers (id, submission_id, question_id, student_response, marks_obtained, ai_suggested_marks, ai_feedback, faculty_feedback, is_graded, graded_at).
11. `grades`: Finalized score summaries and CLO attainment snapshots (id, submission_id, student_id, assessment_id, percentage, grade_letter, finalized_at, finalized_by).
12. `rubrics`: Descriptive grading rubrics (id, question_id, criteria, max_points, level_descriptions).
13. `recommendations`: AI-generated improvement recommendations (id, student_id, course_id, objective_id, priority, weak_topic, explanation, suggested_activity, practice_task, material_id, created_at).
14. `notifications`: Platform alerts (id, user_id, title, message, type, is_read, created_at).

## Row Level Security (RLS) Principles
- **Admin:** Full read/write access across all tables via elevated policy or service role.
- **Faculty:** Full CRUD on courses they own, their materials, their assessments, and enrollment approvals for their courses.
- **Student:** Read-only access to published courses, published materials for approved enrollments, published assessments, and their own submissions/grades/recommendations only.
