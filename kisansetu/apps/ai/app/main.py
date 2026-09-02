from fastapi import FastAPI

from app.config import settings

app = FastAPI(
    title="KisanSetu AI Service",
    description=(
        "Computational AI/optimization service for KisanSetu: demand "
        "forecasting, price intelligence, smart matching, and route "
        "optimization. This service returns predictions/results to the "
        "Node API; it does not write to PostgreSQL directly."
    ),
    version="0.1.0",
)


@app.get("/health")
def health_check() -> dict:
    """Basic liveness check for the AI service."""
    return {
        "status": "ok",
        "service": "kisansetu-ai",
        "environment": settings.ai_service_env,
    }


# Foundation phase: no business routers are mounted yet.
# Demand forecasting, price intelligence, matching, and route optimization
# routers (app/api/demand.py, price.py, matching.py, routes.py) are added
# incrementally in later tasks — see project spec section 25.
