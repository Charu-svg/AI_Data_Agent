# backend/main.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI(title="AI Data Agent")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SQLite database and sample data
def init_db():
    conn = sqlite3.connect("business.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY,
            product TEXT,
            region TEXT,
            quantity INTEGER,
            revenue REAL,
            date TEXT
        )
    """)
    cursor.executemany("""
        INSERT INTO sales (product, region, quantity, revenue, date)
        VALUES (?, ?, ?, ?, ?)
    """, [
        ("Product A", "North", 10, 1000, "2024-01-01"),
        ("Product B", "South", 5, 500, "2024-01-02"),
        ("Product A", "West", 8, 800, "2024-01-03"),
        ("Product C", "East", 12, 1200, "2024-01-04"),
        ("Product D", "North", 15, 1500, "2024-02-01"),
        ("Product E", "South", 20, 2000, "2024-02-05"),
    ])
    conn.commit()
    conn.close()

# Initialize database only once
init_db()

# Dummy SQL generator: always return all rows
def generate_sql(question: str):
    return "SELECT * FROM sales"

# API endpoint to query the database
@app.get("/query")
def query_database(q: str = Query(..., description="Enter your natural language question")):
    try:
        sql = generate_sql(q)
        conn = sqlite3.connect("business.db")
        cursor = conn.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()
        columns = [description[0] for description in cursor.description]
        conn.close()

        if not rows:
            return {"columns": columns, "results": []}

        # Send rows as lists so frontend can map them
        return {
            "query": sql,
            "columns": columns,
            "results": [list(row) for row in rows]
        }

    except Exception as e:
        return {"error": str(e)}
