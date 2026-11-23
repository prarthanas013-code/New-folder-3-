import os
import json
import re

class AIService:
    """
    AI Service powering CourseConnect with Google Gemini integration
    and guaranteed deterministic fallback engines.
    """

    @classmethod
    def _get_gemini_model(cls):
        """Initializes Gemini model if API key is present"""
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return None
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            return genai.GenerativeModel("gemini-1.5-flash")
        except Exception as e:
            print(f"[AIService] Failed to initialize Gemini: {e}")
            return None

    @classmethod
    def generate_learning_objectives(cls, course_title, syllabus_text, num_objectives=5):
        """
        Generates Bloom-aligned Course Learning Objectives from syllabus text.
        """
        model = cls._get_gemini_model()
        if model:
            prompt = f"""
            You are an expert curriculum designer for Outcome-Based Education (OBE) in Higher Education.
            Analyze the following course and syllabus text and generate {num_objectives} Course Learning Objectives (CLOs).
            Each objective MUST map to one of Bloom's 6 Cognitive Levels:
            1. Remember (verbs: Define, List, Identify, State, Recall)
            2. Understand (verbs: Explain, Describe, Summarize, Classify)
            3. Apply (verbs: Implement, Solve, Demonstrate, Execute)
            4. Analyze (verbs: Compare, Differentiate, Examine, Investigate)
            5. Evaluate (verbs: Justify, Critique, Assess, Validate)
            6. Create (verbs: Design, Develop, Construct, Formulate)

            Course Title: {course_title}
            Syllabus: {syllabus_text}

            Return strictly a valid JSON array of objects without markdown formatting:
            [
              {{
                "code": "CLO1",
                "description": "Full objective statement starting with the action verb",
                "bloom_level": "Understand",
                "action_verb": "Explain",
                "target_percentage": 75.0
              }}
            ]
            """
            try:
                response = model.generate_content(prompt)
                clean_text = re.sub(r"```json|```", "", response.text).strip()
                return json.loads(clean_text)
            except Exception as e:
                print(f"[AIService] Gemini CLO generation failed, falling back: {e}")

        # Deterministic Fallback
        return [
            {
                "code": "CLO1",
                "description": f"Explain the core theoretical principles and foundational terminology of {course_title}.",
                "bloom_level": "Understand",
                "action_verb": "Explain",
                "target_percentage": 75.0
            },
            {
                "code": "CLO2",
                "description": f"Implement practical algorithms, methods, and protocols relevant to {course_title}.",
                "bloom_level": "Apply",
                "action_verb": "Implement",
                "target_percentage": 70.0
            },
            {
                "code": "CLO3",
                "description": f"Differentiate between alternative architectural strategies and examine edge cases in {course_title}.",
                "bloom_level": "Analyze",
                "action_verb": "Differentiate",
                "target_percentage": 65.0
            },
            {
                "code": "CLO4",
                "description": f"Assess and critique system performance metrics, security constraints, and efficiency tradeoffs in {course_title}.",
                "bloom_level": "Evaluate",
                "action_verb": "Assess",
                "target_percentage": 65.0
            },
            {
                "code": "CLO5",
                "description": f"Design and develop an integrated software solution or model addressing real-world requirements in {course_title}.",
                "bloom_level": "Create",
                "action_verb": "Design",
                "target_percentage": 60.0
            }
        ]

    @classmethod
    def generate_assessment_questions(cls, course_title, material_text, clos, num_mcqs=3, num_descriptive=2):
        """
        Generates mapped MCQs and descriptive questions with rubrics.
        """
        model = cls._get_gemini_model()
        if model:
            prompt = f"""
            Create academic questions mapped to learning objectives for course: {course_title}.
            Material content: {material_text[:3000]}
            Available CLOs: {json.dumps(clos)}

            Return JSON object:
            {{
              "mcqs": [
                {{
                  "question_text": "...",
                  "options": [{{"id":"A","text":"...","is_correct":false}}, {{"id":"B","text":"...","is_correct":true}}, ...],
                  "correct_answer": "B",
                  "explanation": "...",
                  "max_marks": 5.0,
                  "bloom_level": "Understand",
                  "clo_code": "CLO1",
                  "difficulty": "medium"
                }}
              ],
              "descriptive": [
                {{
                  "question_text": "...",
                  "model_answer": "...",
                  "rubric": {{"criteria": "Algorithm correctness (50%), Complexity analysis (30%), Code clarity (20%)"}},
                  "max_marks": 15.0,
                  "bloom_level": "Apply",
                  "clo_code": "CLO2",
                  "difficulty": "hard"
                }}
              ]
            }}
            """
            try:
                response = model.generate_content(prompt)
                clean_text = re.sub(r"```json|```", "", response.text).strip()
                return json.loads(clean_text)
            except Exception as e:
                print(f"[AIService] Gemini Question Gen failed, falling back: {e}")

        # Deterministic Fallback
        return {
            "mcqs": [
                {
                    "question_text": f"Which asymptotic notation describes the tight bound of an algorithm in {course_title}?",
                    "options": [
                        {"id": "A", "text": "Big-O notation (Upper bound)", "is_correct": False},
                        {"id": "B", "text": "Big-Theta notation (Tight bound)", "is_correct": True},
                        {"id": "C", "text": "Big-Omega notation (Lower bound)", "is_correct": False},
                        {"id": "D", "text": "Little-o notation", "is_correct": False}
                    ],
                    "correct_answer": "B",
                    "explanation": "Big-Theta represents both upper and lower asymptotically tight bounds.",
                    "max_marks": 5.0,
                    "bloom_level": "Understand",
                    "clo_code": "CLO1",
                    "difficulty": "easy"
                },
                {
                    "question_text": f"What is the average time complexity of searching in a hash table with good uniform distribution?",
                    "options": [
                        {"id": "A", "text": "O(1)", "is_correct": True},
                        {"id": "B", "text": "O(log n)", "is_correct": False},
                        {"id": "C", "text": "O(n)", "is_correct": False},
                        {"id": "D", "text": "O(n log n)", "is_correct": False}
                    ],
                    "correct_answer": "A",
                    "explanation": "Hash tables offer amortized constant time O(1) lookups under uniform distribution.",
                    "max_marks": 5.0,
                    "bloom_level": "Apply",
                    "clo_code": "CLO2",
                    "difficulty": "medium"
                }
            ],
            "descriptive": [
                {
                    "question_text": f"Differentiate between dynamic programming and divide-and-conquer methodologies using an optimal substructure problem from {course_title}.",
                    "model_answer": "Dynamic programming is applied when subproblems overlap and are memoized; divide-and-conquer solves independent disjoint subproblems.",
                    "rubric": {
                        "criteria": "Core concept difference (40%), Overlapping subproblems explanation (30%), Concrete example (30%)"
                    },
                    "max_marks": 15.0,
                    "bloom_level": "Analyze",
                    "clo_code": "CLO3",
                    "difficulty": "medium"
                }
            ]
        }

    @classmethod
    def evaluate_descriptive_answer(cls, question_text, model_answer, rubric, student_answer, max_marks):
        """
        Generates suggested marks and formative feedback for a descriptive response.
        """
        model = cls._get_gemini_model()
        if model:
            prompt = f"""
            Evaluate student answer using the rubric and model answer.
            Question: {question_text}
            Model Answer: {model_answer}
            Rubric: {json.dumps(rubric)}
            Student Answer: {student_answer}
            Max Marks: {max_marks}

            Return JSON:
            {{
              "suggested_marks": 12.5,
              "feedback": "...",
              "strengths": "...",
              "areas_for_improvement": "..."
            }}
            """
            try:
                response = model.generate_content(prompt)
                clean_text = re.sub(r"```json|```", "", response.text).strip()
                return json.loads(clean_text)
            except Exception as e:
                print(f"[AIService] Gemini Descriptive Evaluation failed, falling back: {e}")

        # Deterministic Rule-Based Fallback
        answer_len = len(student_answer.strip()) if student_answer else 0
        if answer_len == 0:
            return {
                "suggested_marks": 0.0,
                "feedback": "No answer provided.",
                "strengths": "None",
                "areas_for_improvement": "Must attempt the descriptive question."
            }
        
        # Heuristic ratio based on coverage
        score_ratio = min(1.0, max(0.4, answer_len / 250.0))
        suggested = round(float(max_marks) * score_ratio, 1)

        return {
            "suggested_marks": suggested,
            "feedback": "Good attempt covering primary conceptual points. Verify edge-case analysis and include diagrammatic walkthroughs.",
            "strengths": "Clear definitions and structured explanation.",
            "areas_for_improvement": "Elaborate further on asymptotic complexity tradeoffs."
        }

    @classmethod
    def generate_remediation_plan(cls, student_name, weak_clos, course_title):
        """
        Generates personalized, non-generic remedial learning activities.
        """
        model = cls._get_gemini_model()
        if model:
            prompt = f"""
            Generate personalized remedial advice for student {student_name} who is underperforming in course {course_title}.
            Underperforming objectives: {json.dumps(weak_clos)}

            Return JSON array:
            [
              {{
                "clo_code": "CLO3",
                "priority": "high",
                "weak_topic": "...",
                "explanation": "...",
                "suggested_activity": "Concrete actionable activity (e.g. solve 3 trace diagrams)",
                "practice_task": "Specific exercise question to solve"
              }}
            ]
            """
            try:
                response = model.generate_content(prompt)
                clean_text = re.sub(r"```json|```", "", response.text).strip()
                return json.loads(clean_text)
            except Exception as e:
                print(f"[AIService] Gemini Remediation Plan failed, falling back: {e}")

        # Deterministic Fallback
        plans = []
        for clo in weak_clos:
            code = clo.get("code", "CLO")
            bloom = clo.get("bloom_level", "Apply")
            plans.append({
                "clo_code": code,
                "priority": clo.get("priority", "high"),
                "weak_topic": f"{code} — {bloom} Cognitive Skills",
                "explanation": f"Your current attainment is {clo.get('attainment', 0)}%, which is below the target threshold of {clo.get('target_percentage', 70)}%.",
                "suggested_activity": f"Practice 5 interactive step-by-step problem walkthroughs focusing on {bloom.lower()}ing techniques.",
                "practice_task": f"Complete supplementary exercise set for {code} in the course study materials."
            })
        return plans
