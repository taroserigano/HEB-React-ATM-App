import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [pin, setPin] = useState("");
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Simulate PIN authentication
    if (pin === "1234") {
      const user = { pin };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } else {
      alert("Invalid PIN");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 text-white w-80">
        <h1 className="text-3xl font-bold mb-6 text-center">ATM Login</h1>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
