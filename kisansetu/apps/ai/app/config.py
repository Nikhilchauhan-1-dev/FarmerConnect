from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Foundation-phase settings. Forecasting/matching/routing-specific
    settings are added alongside those features (spec section 25).
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    ai_service_port: int = 8000
    ai_service_env: str = "development"
    api_service_url: str = "http://localhost:4000"


settings = Settings()
