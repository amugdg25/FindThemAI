from application.database import engine, Base
import application.models as models

def reset_db():
    # Drop all tables
    Base.metadata.drop_all(bind=engine)

    # Create all tables defined in Base subclasses
    Base.metadata.create_all(bind=engine)

reset_db()

print("Tables created successfully!")