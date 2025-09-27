# AI_Data_Agent

A full-stack AI-driven project for automating data handling and providing intelligent insights through a Python backend and React frontend.

---

## Features
- AI-powered data processing with OpenAI API.
- FastAPI backend for scalable APIs.
- React frontend for responsive UI.
- Secure environment configuration using `.env`.
- SQLite (or alternative) database support.

---

## Project Structure
AI_Data_Agent/
├─ backend/
│ ├─ main.py
│ ├─ requirements.txt
│ └─ .env # ignored
├─ frontend/
│ ├─ package.json
│ ├─ src/
│ └─ build/ # ignored
└─ .gitignore

---

## Setup




HOW TO RUN

```bash
## backend
 venv
# Activate venv
venv\Scripts\activate  # Windows
source venv/bin/activate # Mac/Linux
pip install fastapi uvicorn
uvicorn main:app --reload  



## Frontend
--bash
cd frontend
npm install axios react-chartjs-2 chart.js
npm start

Backend runs on http://localhost:8000/docs, frontend on http://localhost:3000.
ask any question like show all sales

# Clone the repository
git clone https://github.com/Charu-svg/AI_Data_Agent.git
