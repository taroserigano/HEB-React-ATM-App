import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [pin, setPin] = useState("");
  const { state, login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleButtonClick = (value) => {
    // limit to 4 digits
    setPin((prevPin) => (prevPin.length < 4 ? prevPin + value : prevPin));
  };

  const handleLogin = async () => {
    try {
      // if PIN matched
      if (pin === "7777") {
        const user = { pin };
        console.log(user);
        login(user);
        navigate("/");
      } else {
        alert("Invalid PIN");
        setPin("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
      setPin("");
    }
  };

  const handleClear = () => {
    setPin("");
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        state.darkMode ? "bg-gray-900" : "bg-gray-200"
      }`}
    >
      <div className="bg-gray-800 shadow-md rounded-lg p-8 text-red-600 w-full max-w-xs">
        <h1 className="text-3xl font-black mb-6 text-center">H-E-B ATM</h1>
        <h3 className="text-white text-xl font-bold mb-6 text-center">
          Enter your PIN{" "}
          <span className="text-white text-sm mb-6 text-center">
            (it's 7777)
          </span>
        </h3>
        <div className="mb-4 text-center">
          <input
            type="password"
            value={pin}
            readOnly
            className="w-full py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Enter"].map(
            (value, index) => (
              <button
                key={index}
                onClick={() => {
                  if (value === "Clear") {
                    handleClear();
                  } else if (value === "Enter") {
                    handleLogin();
                  } else {
                    handleButtonClick(value);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {value}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
