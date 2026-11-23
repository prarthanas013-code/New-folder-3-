-- ====================================================================
-- CourseConnect Row Level Security (RLS) Policies
-- Enforcing Role-Based Access Control at Database Layer
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user is faculty
CREATE OR REPLACE FUNCTION public.is_faculty()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'faculty'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES POLICIES
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. COURSES POLICIES
CREATE POLICY "Anyone authenticated can view unarchived courses"
    ON public.courses FOR SELECT
    USING (auth.role() = 'authenticated' AND (NOT is_archived OR faculty_id = auth.uid() OR public.is_admin()));

CREATE POLICY "Faculty can insert courses"
    ON public.courses FOR INSERT
    WITH CHECK (auth.uid() = faculty_id AND public.is_faculty());

CREATE POLICY "Faculty can update their courses"
    ON public.courses FOR UPDATE
    USING (auth.uid() = faculty_id OR public.is_admin());

-- 3. ENROLLMENTS POLICIES
CREATE POLICY "Students can view own enrollments"
    ON public.enrollments FOR SELECT
    USING (auth.uid() = student_id OR EXISTS (
        SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.faculty_id = auth.uid()
    ) OR public.is_admin());

CREATE POLICY "Students can request enrollment"
    ON public.enrollments FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Faculty can update enrollment status"
    ON public.enrollments FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.faculty_id = auth.uid()
    ) OR public.is_admin());

-- 4. MATERIALS POLICIES
CREATE POLICY "Enrolled students and faculty can view published materials"
    ON public.materials FOR SELECT
    USING (
        faculty_id = auth.uid() 
        OR public.is_admin()
        OR (
            is_published = true 
            AND EXISTS (
                SELECT 1 FROM public.enrollments 
                WHERE enrollments.course_id = materials.course_id 
                AND enrollments.student_id = auth.uid() 
                AND enrollments.status IN ('approved', 'active')
            )
        )
    );

CREATE POLICY "Faculty can manage materials"
    ON public.materials FOR ALL
    USING (faculty_id = auth.uid() OR public.is_admin());

-- 5. ASSESSMENTS POLICIES
CREATE POLICY "Enrolled students can view published assessments"
    ON public.assessments FOR SELECT
    USING (
        faculty_id = auth.uid() 
        OR public.is_admin()
        OR (
            is_published = true 
            AND EXISTS (
                SELECT 1 FROM public.enrollments 
                WHERE enrollments.course_id = assessments.course_id 
                AND enrollments.student_id = auth.uid() 
                AND enrollments.status IN ('approved', 'active')
            )
        )
    );

CREATE POLICY "Faculty can manage assessments"
    ON public.assessments FOR ALL
    USING (faculty_id = auth.uid() OR public.is_admin());

-- 6. SUBMISSIONS & ANSWERS POLICIES
CREATE POLICY "Students can view and create own submissions"
    ON public.submissions FOR ALL
    USING (student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.assessments 
        WHERE assessments.id = submissions.assessment_id 
        AND assessments.faculty_id = auth.uid()
    ) OR public.is_admin());

CREATE POLICY "Students can view and create own answers"
    ON public.answers FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.submissions 
        WHERE submissions.id = answers.submission_id 
        AND submissions.student_id = auth.uid()
    ) OR EXISTS (
        SELECT 1 FROM public.submissions 
        JOIN public.assessments ON assessments.id = submissions.assessment_id 
        WHERE submissions.id = answers.submission_id 
        AND assessments.faculty_id = auth.uid()
    ) OR public.is_admin());

-- 7. RECOMMENDATIONS POLICIES
CREATE POLICY "Students can view own recommendations"
    ON public.recommendations FOR SELECT
    USING (student_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.courses 
        WHERE courses.id = recommendations.course_id 
        AND courses.faculty_id = auth.uid()
    ) OR public.is_admin());
