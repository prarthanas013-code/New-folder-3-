-- ====================================================================
-- CourseConnect Seed Data
-- Comprehensive Demo Dataset for Accreditation & Testing
-- ====================================================================

-- 1. DEMO PROFILES
INSERT INTO public.profiles (id, email, full_name, role, department)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin@courseconnect.edu', 'Dean Sterling', 'admin', 'Academic Affairs'),
    ('22222222-2222-2222-2222-222222222222', 'elena.vance@courseconnect.edu', 'Dr. Elena Vance', 'faculty', 'Computer Science'),
    ('33333333-3333-3333-3333-333333333333', 'alex.rivera@student.edu', 'Alex Rivera', 'student', 'Computer Science'),
    ('44444444-4444-4444-4444-444444444444', 'lora.peterson@student.edu', 'Lora Peterson', 'student', 'Computer Science')
ON CONFLICT (id) DO NOTHING;

-- 2. DEMO COURSE: CS301 (Data Structures and Algorithms)
INSERT INTO public.courses (id, code, title, description, semester, academic_year, enrollment_code, faculty_id, target_attainment_pct)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CS301', 'Data Structures & Algorithms', 'Fundamental algorithmic concepts, graph theory, trees, and complexity analysis.', 'Fall', '2026-2027', 'DSA2026', '22222222-2222-2222-2222-222222222222', 75.00)
ON CONFLICT (id) DO NOTHING;

-- 3. DEMO ENROLLMENTS
INSERT INTO public.enrollments (course_id, student_id, status)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'active'),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'active')
ON CONFLICT (course_id, student_id) DO NOTHING;

-- 4. DEMO CLOs (Mapped across Bloom's Taxonomy)
INSERT INTO public.learning_objectives (id, course_id, code, description, bloom_level, action_verb, target_percentage)
VALUES
    ('bbbbbbbb-bbbb-bbbb-bbbb-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CLO1', 'Define and explain algorithmic complexity using Asymptotic Notations.', 'Understand', 'Explain', 75.00),
    ('bbbbbbbb-bbbb-bbbb-bbbb-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CLO2', 'Implement balanced search trees and hashing mechanisms in software.', 'Apply', 'Implement', 70.00),
    ('bbbbbbbb-bbbb-bbbb-bbbb-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CLO3', 'Compare and differentiate greedy versus dynamic programming techniques.', 'Analyze', 'Compare', 65.00),
    ('bbbbbbbb-bbbb-bbbb-bbbb-000000000004', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CLO4', 'Design a scalable shortest-path navigation model for city routing.', 'Create', 'Design', 60.00)
ON CONFLICT (id) DO NOTHING;

-- 5. DEMO ASSESSMENT
INSERT INTO public.assessments (id, course_id, faculty_id, title, instructions, duration_minutes, max_marks, is_published, results_released)
VALUES
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'Midterm OBE Assessment 1', 'Answer all MCQ and algorithmic questions within 60 minutes.', 60, 50.00, true, true)
ON CONFLICT (id) DO NOTHING;

-- 6. DEMO QUESTIONS
INSERT INTO public.questions (id, assessment_id, question_text, question_type, options, correct_answer, max_marks, difficulty, explanation)
VALUES
    ('dddddddd-dddd-dddd-dddd-000000000001', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'What is the worst-case time complexity of lookup in an AVL Tree?', 'mcq', '[{"id":"A","text":"O(1)"},{"id":"B","text":"O(log n)"},{"id":"C","text":"O(n)"},{"id":"D","text":"O(n log n)"}]', 'B', 5.00, 'easy', 'AVL trees maintain strict balance factor resulting in logarithmic worst-case depth.'),
    ('dddddddd-dddd-dddd-dddd-000000000002', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Differentiate between Prim and Kruskal minimum spanning tree algorithms under sparse versus dense graph conditions.', 'descriptive', null, null, 15.00, 'medium', 'Evaluate based on time complexity comparisons with binary heap vs adjacency matrix.')
ON CONFLICT (id) DO NOTHING;

-- 7. QUESTION OBJECTIVE MAPPINGS
INSERT INTO public.question_objectives (question_id, objective_id, weight_percentage, allocated_marks)
VALUES
    ('dddddddd-dddd-dddd-dddd-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002', 100.00, 5.00),
    ('dddddddd-dddd-dddd-dddd-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000003', 100.00, 15.00)
ON CONFLICT (question_id, objective_id) DO NOTHING;

-- 8. DEMO SUBMISSION & GRADES
INSERT INTO public.submissions (id, assessment_id, student_id, attempt_number, total_score, is_finalized)
VALUES
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 1, 18.00, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.grades (submission_id, student_id, assessment_id, percentage, grade_letter)
VALUES
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 90.00, 'A')
ON CONFLICT (id) DO NOTHING;
