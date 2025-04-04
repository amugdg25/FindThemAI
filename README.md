# **FindThemAI**

**AI-Powered Missing Person Identification Web App**

<p align="center">
  <img src="./logo.svg" width="150" alt="FindThemAI Logo">
</p>

## **🔹 Clone This Repository**

```sh
git clone https://github.com/amugdg25/FindThemAI.git
cd FindThemAI
```

---

## **📌 Backend Setup**

### **1️⃣ Install Required Dependencies (Linux)**

```sh
sudo apt install postgresql postgresql-server-dev-all
```

### **2️⃣ Install `pgvector` Extension**

```sh
cd /tmp
git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git
cd pgvector
make
sudo make install
```

### **3️⃣ Set Up Python Virtual Environment**

```sh
cd FindThemAI/backend
python -m venv venv
source venv/bin/activate  # Activate the virtual environment
```

### **4️⃣ Install Python Dependencies**

```sh
pip install -r requirements.txt
```

---

## **🛠️ Database Configuration**

### **5️⃣ Create a PostgreSQL Database**

```sh
sudo -i -u postgres
psql
```

Run the following SQL commands inside `psql`:

```sql
CREATE USER alex WITH PASSWORD '12345';
CREATE DATABASE missing_persons_db OWNER alex;
\c missing_persons_db;
CREATE EXTENSION IF NOT EXISTS vector;
```

**Restart PostgreSQL Service:**

```sh
sudo systemctl restart postgresql
```

---

## **🔹 Initialize & Run the Backend**

### **6️⃣ Initialize the Database (⚠️ This will reset the DB)**

```sh
python init_db.py
```

### **7️⃣ Run the FastAPI Backend**

```sh
uvicorn main:app --reload
```

---

## **🌐 API Endpoints**

| Endpoint                                                         | Description                                        |
| ---------------------------------------------------------------- | -------------------------------------------------- |
| `http://127.0.0.1:8000/api/v1/`                                  | Root API Endpoint                                  |
| `http://127.0.0.1:8000/api/v1/register`                          | Register a new user                                |
| `http://127.0.0.1:8000/api/v1/token`                             | Login and obtain JWT token                         |
| `http://127.0.0.1:8000/api/v1/protected`                         | Test protected routes                              |
| `http://127.0.0.1:8000/api/v1/users`                             | Fetch all users                                    |
| `http://127.0.0.1:8000/api/v1/users/<user_id>`                   | Get a specific user                                |
| `http://127.0.0.1:8000/api/v1/create-missing-person`             | Create a missing person report                     |
| `http://127.0.0.1:8000/api/v1/missing-persons`                   | Fetch all missing persons                          |
| `http://127.0.0.1:8000/api/v1/missing-persons/<person_id>`       | Fetch a specific missing person                    |
| `http://127.0.0.1:8000/api/v1/missing-persons/<person_id>/image` | Fetch the missing person’s image                   |
| `http://127.0.0.1:8000/api/v1/found-person`                      | Search for a found person using facial recognition |

---

## **🖥️ Frontend Setup**

### **1️⃣ Navigate to Frontend**

```sh
cd ../frontend
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Start the Frontend**

```sh
npm run dev
```

---

## **📸 Mockups of the Website**

Here are some UI mockups demonstrating how the **FindThemAI** platform will look:

<p align="center">
  <img src="./designs/mockups/mockup-1.png" width="700" alt="FindThemAI Mockup">
  <img src="./designs/mockups/mockup-2.png" width="700" alt="FindThemAI Mockup">
</p>

---

### **📢 Support & Feedback**

🔗 Visit: [FindThemAI Website ([Click here](http://findthem-ai.vercel.app/))]
