import os
import platform
import time
from flask import Blueprint, jsonify, current_app

health_bp = Blueprint("health", __name__)
START_TIME = time.time()

@health_bp.route("/health", methods=["GET"])
def health_check():
    """
    Health check endpoint returning system diagnostics,
    uptime, and service connectivity indicators.
    """
    uptime_seconds = int(time.time() - START_TIME)
    
    # Check configured services (without revealing secrets)
    has_supabase = bool(current_app.config.get("SUPABASE_URL") and current_app.config.get("SUPABASE_ANON_KEY"))
    has_gemini = bool(current_app.config.get("GEMINI_API_KEY"))

    return jsonify({
        "success": True,
        "status": "healthy",
        "service": "CourseConnect API",
        "version": "1.0.0",
        "environment": current_app.config.get("FLASK_ENV", "development"),
        "uptime": f"{uptime_seconds}s",
        "timestamp": int(time.time()),
        "platform": {
            "python_version": platform.python_version(),
            "os": platform.system()
        },
        "services": {
            "supabase_configured": has_supabase,
            "gemini_configured": has_gemini
        },
        "message": "CourseConnect Learning Outcome Analysis Engine is running smoothly."
    }), 200
