import sqlite3

conn = sqlite3.connect("business.db")
cursor = conn.cursor()

# Create table
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

# Insert sample data
cursor.executemany("""
INSERT INTO sales (product, region, quantity, revenue, date)
VALUES (?, ?, ?, ?, ?)
""", [
    ("Product A", "North", 10, 1000, "2024-01-01"),
    ("Product B", "South", 5, 500, "2024-01-02"),
    ("Product A", "West", 8, 800, "2024-01-03"),
    ("Product C", "East", 12, 1200, "2024-01-04"),
    ("Product A", "North", 15, 1500, "2024-02-01"),
    ("Product B", "South", 20, 2000, "2024-02-05"),
    ("Product C", "East", 10, 1000, "2024-02-07"),
    ("Product D", "West", 18, 1800, "2024-02-10"),
    ("Product E", "North", 7, 700, "2024-03-01"),
    ("Product F", "South", 9, 900, "2024-03-05"),
    ("Product G", "East", 11, 1100, "2024-03-07"),
    ("Product H", "West", 6, 600, "2024-03-10"),
])

conn.commit()
conn.close()
print("Database ready!")
