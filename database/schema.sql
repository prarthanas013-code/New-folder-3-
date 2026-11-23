-- ====================================================================
-- CourseConnect PostgreSQL Database Schema
-- Multi-Tenant OBE Platform with Row-Level Security (RLS)
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extended user profile linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'faculty', 'student')),
    avatar_url TEXT,
    department TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    semester TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    syllabus_url TEXT,
    enrollment_code TEXT NOT NULL UNIQUE,
    faculty_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_archived BOOLEAN DEFAULT FALSE,
    target_attainment_pct NUMERIC(5,2) DEFAULT 70.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENROLLMENTS
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'active')),
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, student_id)
);

-- 4. LEARNING OBJECTIVES (CLOs)
CREATE TABLE IF NOT EXISTS public.learning_objectives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    code TEXT NOT NULL, -- e.g. CLO1, CLO2
    description TEXT NOT NULL,
    bloom_level TEXT NOT NULL CHECK (bloom_level IN ('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create')),
    action_verb TEXT NOT NULL,
    target_percentage NUMERIC(5,2) DEFAULT 70.00,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('draft', 'pending_review', 'approved')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, code)
);

-- 5. MATERIALS (Study Resources)
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'ppt', 'pptx', 'doc', 'docx', 'txt', 'link')),
    file_size_bytes BIGINT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- 6. ASSESSMENTS
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT,
    duration_minutes INT NOT NULL DEFAULT 60,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    max_marks NUMERIC(6,2) NOT NULL DEFAULT 100.00,
    attempt_limit INT DEFAULT 1,
    is_published BOOLEAN DEFAULT FALSE,
    results_released BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QUESTIONS
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'descriptive')),
    options JSONB, -- For MCQ: [{id: 'A', text: '...'}, ...]
    correct_answer TEXT, -- For MCQ: 'A', 'B', etc.
    model_answer TEXT, -- For Descriptive
    max_marks NUMERIC(5,2) NOT NULL DEFAULT 1.00,
    difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. QUESTION OBJECTIVES (Mapping Questions to CLOs with weights)
CREATE TABLE IF NOT EXISTS public.question_objectives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    objective_id UUID NOT NULL REFERENCES public.learning_objectives(id) ON DELETE CASCADE,
    weight_percentage NUMERIC(5,2) DEFAULT 100.00,
    allocated_marks NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(question_id, objective_id)
);

-- 9. SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    attempt_number INT DEFAULT 1,
    start_time TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    total_score NUMERIC(6,2),
    is_finalized BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assessment_id, student_id, attempt_number)
);

-- 10. ANSWERS
CREATE TABLE IF NOT EXISTS public.answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    student_response TEXT,
    marks_obtained NUMERIC(5,2),
    ai_suggested_marks NUMERIC(5,2),
    ai_feedback TEXT,
    faculty_feedback TEXT,
    is_graded BOOLEAN DEFAULT FALSE,
    graded_at TIMESTAMPTZ,
    UNIQUE(submission_id, question_id)
);

-- 11. GRADES
CREATE TABLE IF NOT EXISTS public.grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    percentage NUMERIC(5,2) NOT NULL,
    grade_letter TEXT,
    finalized_at TIMESTAMPTZ DEFAULT NOW(),
    finalized_by UUID REFERENCES public.profiles(id)
);

-- 12. RUBRICS
CREATE TABLE IF NOT EXISTS public.rubrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    criteria TEXT NOT NULL,
    max_points NUMERIC(5,2) NOT NULL,
    level_descriptions JSONB -- { "excellent": "...", "good": "...", "poor": "..." }
);

-- 13. RECOMMENDATIONS
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    objective_id UUID NOT NULL REFERENCES public.learning_objectives(id) ON DELETE CASCADE,
    priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    weak_topic TEXT NOT NULL,
    explanation TEXT NOT NULL,
    suggested_activity TEXT NOT NULL,
    practice_task TEXT NOT NULL,
    material_id UUID REFERENCES public.materials(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'assessment', 'grade', 'recommendation', 'alert')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_courses_faculty ON public.courses(faculty_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_learning_objectives_course ON public.learning_objectives(course_id);
CREATE INDEX IF NOT EXISTS idx_assessments_course ON public.assessments(course_id);
CREATE INDEX IF NOT EXISTS idx_questions_assessment ON public.questions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_question_objectives_q ON public.question_objectives(question_id);
CREATE INDEX IF NOT EXISTS idx_question_objectives_obj ON public.question_objectives(objective_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assessment ON public.submissions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON public.submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_answers_submission ON public.answers(submission_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_student ON public.recommendations(student_id);
