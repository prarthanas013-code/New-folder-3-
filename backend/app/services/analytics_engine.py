from decimal import Decimal, ROUND_HALF_UP

class LearningOutcomeEngine:
    """
    Core Analytics Service for CourseConnect.
    Calculates individual and cohort-level CLO attainment,
    Bloom's taxonomy cognitive profiling, and achievement classifications.
    """

    # Configurable Default Thresholds
    THRESHOLDS = {
        "excellent": Decimal("85.0"),
        "achieved": Decimal("70.0"),
        "needs_improvement": Decimal("50.0")
    }

    @classmethod
    def calculate_individual_clo_attainment(cls, obtained_marks, max_marks):
        """
        Formula: (Marks obtained for questions mapped to a CLO / Max possible marks for that CLO) * 100
        """
        if not max_marks or Decimal(str(max_marks)) <= Decimal("0"):
            return Decimal("0.0")
        
        obtained = Decimal(str(obtained_marks))
        maximum = Decimal(str(max_marks))
        
        attainment = (obtained / maximum) * Decimal("100.0")
        return attainment.quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)

    @classmethod
    def calculate_class_clo_attainment(cls, total_student_obtained, total_student_possible):
        """
        Formula: (Total marks obtained by all students / Total possible marks for those students) * 100
        """
        if not total_student_possible or Decimal(str(total_student_possible)) <= Decimal("0"):
            return Decimal("0.0")
        
        obtained = Decimal(str(total_student_obtained))
        maximum = Decimal(str(total_student_possible))
        
        class_attainment = (obtained / maximum) * Decimal("100.0")
        return class_attainment.quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)

    @classmethod
    def classify_attainment(cls, percentage, custom_thresholds=None):
        """
        Classify attainment percentage:
        85–100%: Excellent
        70–84%: Achieved
        50–69%: Needs Improvement
        Below 50%: Not Achieved
        """
        pct = Decimal(str(percentage))
        thresholds = custom_thresholds or cls.THRESHOLDS

        if pct >= thresholds["excellent"]:
            return {"status": "Excellent", "color": "emerald", "badge": "bg-emerald-100 text-emerald-800 border-emerald-300"}
        elif pct >= thresholds["achieved"]:
            return {"status": "Achieved", "color": "blue", "badge": "bg-blue-100 text-blue-800 border-blue-300"}
        elif pct >= thresholds["needs_improvement"]:
            return {"status": "Needs Improvement", "color": "amber", "badge": "bg-amber-100 text-amber-800 border-amber-300"}
        else:
            return {"status": "Not Achieved", "color": "rose", "badge": "bg-rose-100 text-rose-800 border-rose-300"}

    @classmethod
    def calculate_bloom_attainment(cls, questions_and_scores):
        """
        Groups scored questions across Bloom's 6 levels:
        1. Remember
        2. Understand
        3. Apply
        4. Analyze
        5. Evaluate
        6. Create
        Returns dictionary of attainment % for each cognitive level.
        """
        bloom_levels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]
        results = {level: {"obtained": Decimal("0.0"), "max": Decimal("0.0"), "attainment": Decimal("0.0")} for level in bloom_levels}

        for item in questions_and_scores:
            lvl = item.get("bloom_level")
            if lvl in results:
                results[lvl]["obtained"] += Decimal(str(item.get("obtained_marks", 0)))
                results[lvl]["max"] += Decimal(str(item.get("max_marks", 0)))

        for lvl, data in results.items():
            if data["max"] > Decimal("0.0"):
                data["attainment"] = ((data["obtained"] / data["max"]) * Decimal("100.0")).quantize(Decimal("0.1"), rounding=ROUND_HALF_UP)
            data["obtained"] = float(data["obtained"])
            data["max"] = float(data["max"])
            data["attainment"] = float(data["attainment"])

        return results

    @classmethod
    def identify_weak_learning_objectives(cls, clo_attainments, default_target=70.0):
        """
        Filters and ranks objectives where attainment is below the target threshold.
        """
        weak_clos = []
        for clo in clo_attainments:
            target = clo.get("target_percentage", default_target)
            attainment = clo.get("attainment", 0.0)
            if attainment < target:
                deficit = round(target - attainment, 1)
                weak_clos.append({
                    **clo,
                    "deficit": deficit,
                    "priority": "high" if deficit >= 20.0 else "medium"
                })
        
        # Sort by largest deficit first
        return sorted(weak_clos, key=lambda x: x["deficit"], reverse=True)
