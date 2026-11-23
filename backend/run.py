import os
import sys

# Ensure root directory is on Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(os.path.dirname(__file__))))

from backend.app import create_app
from backend.config import get_config

app = create_app(get_config())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    host = os.environ.get("HOST", "0.0.0.0")
    print(f"🚀 CourseConnect API server running at http://localhost:{port}")
    print(f"🔗 Health check available at http://localhost:{port}/api/health")
    app.run(host=host, port=port, debug=app.config.get("DEBUG", True))
