import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zartek-task.vercel.app/api/resto-cafe"
        );
        console.log(response.data.data)
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    
    <>
    <Dashboard/>
    </>
  );
};

export default App;
