import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "../components/Graph";
import Form from "../components/Form";
import "./AppPage.css";

function AppPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="App bg-black">
      <div className="container mx-auto max-w-3xl text-center drop-shadow-lg text-gray-800 border  bg-slate-400">
        <h1 className="text-4xl py-8 mb-4 bg-blue-500 text-white rounded">
          Expense Manager
        </h1>

        {name && <p className="user-name">Welcome, {name}!</p>}
        <div className="logout-button">
          <button
            onClick={handleLogout}
            className="border py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            Logout
          </button>
        </div>

        <div className=" grid grid-cols-1 gap-4">
          <Form></Form>

          <Graph></Graph>
        </div>
      </div>
    </div>
  );
}

export default AppPage;
