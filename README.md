# FindThemAI
AI Missing Person Identification Web App

## CLONE THIS REPO
```
git clone https://github.com/amugdg25/FindThemAI.git
```

## BACKEND
Install Required Packages in Linux
```
sudo apt install postgresql postgresql-server-dev-all
```
```
cd /tmp
git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git
cd pgvector
make
sudo make install
```

Create and Activate Python Virtual Environment
```
cd FindThemAI/backend
python -m venv venv
source venv/bin/activate
```

Install Dependencies
```
pip install -r requirements.txt
```

CREATE DATABASE
```
sudo -i -u postgres
```
```
psql
```
```
CREATE USER alex WITH PASSWORD 12345;
CREATE DATABASE missing_persons_db OWNER alex;
```
```
\c missing_persons_db
```
```
CREATE EXTENSION IF NOT EXISTS vector;
```

Restart PostgreSQL
```
sudo systemctl restart postgresql
```

Initialize Database (WARNING: This will drop all tables from missing_persons_db database and create tables using Models)
```
python init_db.py
```

RUN  APP
```
uvicorn main:app --reload
```

API Endpoints
```
http://127.0.0.1:8000/api/v1/
http://127.0.0.1:8000/api/v1/register
http://127.0.0.1:8000/api/v1/token
http://127.0.0.1:8000/api/v1/users
http://127.0.0.1:8000/api/v1/users/<user_id>
http://127.0.0.1:8000/api/v1/missing_persons
http://127.0.0.1:8000/api/v1/missing_persons/<person_id>
http://127.0.0.1:8000/api/v1/missing_persons/<person_id>/image
http://127.0.0.1:8000/api/v1/found_person

```

 
## FRONTEND
