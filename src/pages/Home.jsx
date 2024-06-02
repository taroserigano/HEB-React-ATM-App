import React, { useContext, useState, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleButtonClick = (value) => {
    setAmount((prevAmount) =>
      prevAmount.length < 8 ? prevAmount + value : prevAmount
    );
  };

  const handleDeposit = useCallback(async () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    dispatch({ type: "DEPOSIT", payload: depositAmount });
    setAmount("");
    setError("");
    setLoading(false);
  }, [amount, dispatch]);

  const handleWithdraw = useCallback(async () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (withdrawAmount > state.balance) {
      setError("Insufficient funds.");
      return;
    }
    if (state.dailyWithdrawn + withdrawAmount > state.dailyLimit) {
      setError("Daily withdrawal limit exceeded.");
      return;
    }
    setLoading(true);
    dispatch({ type: "WITHDRAW", payload: withdrawAmount });
    setAmount("");
    setError("");
    setLoading(false);
  }, [amount, state.balance, state.dailyWithdrawn, state.dailyLimit, dispatch]);

  const handleClear = () => {
    setAmount("");
  };

  const resetDailyLimit = async () => {
    dispatch({ type: "RESET_DAILY_LIMIT" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded p-8 mb-4 dark:text-white w-80">
        <h1 className="text-3xl font-bold mb-4 text-center">ATM Machine</h1>
        {loading ? (
          <p className="text-center text-xl">Processing...</p>
        ) : (
          <>
            <p className="mb-4 text-lg font-semibold text-center">
              Current Balance: ${state.balance.toFixed(2)}
            </p>
            <div className="mb-4 text-center">
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full py-2 px-3 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
            </div>
            {error && (
              <p className="text-red-500 font-semibold text-center">{error}</p>
            )}

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Clear", 0, "Enter"].map(
                (value, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (value === "Clear") {
                        handleClear();
                      } else if (value === "Enter") {
                        // Handle deposit or withdraw based on some condition or button selection
                        // For simplicity, let's assume it's always deposit here
                        handleDeposit();
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

            <div className="flex justify-between gap-2 mb-4">
              <button
                onClick={handleDeposit}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
              >
                Deposit
              </button>
              <button
                onClick={handleWithdraw}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2"
              >
                Withdraw
              </button>
            </div>

            <p className="text-lg font-semibold text-center">
              Daily Limit: ${state.dailyLimit}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={resetDailyLimit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset Daily Limit
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
