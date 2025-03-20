from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Database Config
    DATABASE_URL: str
    
    # JWT Config
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # Default: 30 minutes


    # Model Path
    MODEL_PATH: str

    # Load from .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

# Create a settings instance
settings = Settings()