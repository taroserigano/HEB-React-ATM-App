import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  balance: 2000,
  dailyLimit: 500,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "WITHDRAW":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.payload };
    case "RESET_DAILY_LIMIT":
      return { ...state, dailyLimit: 500 };
    case "SET_DAILY_LIMIT":
      return { ...state, dailyLimit: action.payload };
    default:
      return state;
  }
};

export const TransactionsContext = createContext();

export const TransactionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // get data at initial loading
  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedDailyLimit = localStorage.getItem("dailyLimit");
    if (storedBalance) {
      dispatch({ type: "SET_BALANCE", payload: parseFloat(storedBalance) });
    }
    if (storedDailyLimit) {
      dispatch({
        type: "SET_DAILY_LIMIT",
        payload: parseFloat(storedDailyLimit),
      });
    }
  }, []);

  const setBalance = (balance) => {
    localStorage.setItem("balance", balance.toString());
    dispatch({ type: "SET_BALANCE", payload: balance });
  };

  const deposit = (amount) => {
    dispatch({ type: "DEPOSIT", payload: amount });
    setBalance(state.balance + amount);
  };

  const withdraw = (amount) => {
    if (amount > state.balance) {
      alert("Insufficient funds");
    } else if (state.withdrawalsToday + amount > state.dailyLimit) {
      alert("Daily limit exceeded");
    } else {
      dispatch({ type: "WITHDRAW", payload: amount });
      setBalance(state.balance - amount);
    }
  };

  const resetDailyLimit = () => {
    dispatch({ type: "RESET_DAILY_LIMIT" });
  };

  const setDailyLimit = (limit) => {
    localStorage.setItem("dailyLimit", limit.toString());
    dispatch({ type: "SET_DAILY_LIMIT", payload: limit });
  };

  return (
    <TransactionsContext.Provider
      value={{ state, deposit, withdraw, resetDailyLimit, setDailyLimit }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
