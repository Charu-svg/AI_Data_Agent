import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/query?q=${encodeURIComponent(question)}`
      );
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = results
    ? {
        labels: [...new Set(results.results.map((r) => r[1]))], // product names
        datasets: [
          {
            label: "Revenue",
            data: [...new Set(results.results.map((r) => r[4]))],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      }
    : null;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI Data Agent</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a business question..."
          style={{ width: "400px", padding: "8px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
          Ask
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && (
        <div style={{ marginTop: "20px" }}>
          <h2>Results:</h2>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Id</th>
                <th>Product</th>
                <th>Region</th>
                <th>Quantity</th>
                <th>Revenue</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.results.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {chartData && (
            <div style={{ marginTop: "40px", width: "600px" }}>
              <h3>Revenue by Product</h3>
              <Bar data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
