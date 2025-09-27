// src/App.js
import React, { useEffect, useState } from "react";
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/query?q=Show all sales")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Prepare chart data
  const chartData = {
    labels: data.results.map((row) => row[1]), // product names
    datasets: [
      {
        label: "Revenue",
        data: data.results.map((row) => row[4]), // revenue column
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sales Revenue" },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Data Agent</h1>

      <h2>Sales Chart</h2>
      <Bar data={chartData} options={chartOptions} />

      <h2>Sales Table</h2>
      <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            {data.columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.results && data.results.length > 0 ? (
            data.results.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={data.columns.length}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
