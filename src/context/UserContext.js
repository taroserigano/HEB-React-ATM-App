import React, { createContext, useReducer, useEffect } from "react";

// set initial state
const initialState = {
  user: null,
  balance: 2000,
  dailyLimit: 500,
  totalWithdrawn: 0,
  darkMode: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.payload };
    case "WITHDRAW":
      return {
        ...state,
        balance: state.balance - action.payload,
        totalWithdrawn: state.totalWithdrawn + action.payload,
      };
    case "RESET_DAILY_LIMIT":
      return { ...state, dailyLimit: 500 };
    case "SET_DAILY_LIMIT":
      return { ...state, dailyLimit: action.payload };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // extract user data at initial rendering 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: storedUser });
    }
    if (storedDarkMode) {
      dispatch({ type: "TOGGLE_DARK_MODE" });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const deposit = (amount) => {
    dispatch({ type: "DEPOSIT", payload: amount });
  };

  const withdraw = (amount) => {
    if (amount > state.balance) {
      alert("Insufficient funds");
    } else if (state.totalWithdrawn + amount > state.dailyLimit) {
      // exceeding the daily limit
      alert("Daily limit exceeded");
    } else {
      dispatch({ type: "WITHDRAW", payload: amount });
    }
  };

  const resetDailyLimit = () => {
    dispatch({ type: "RESET_DAILY_LIMIT" });
  };

  const setDailyLimit = (limit) => {
    dispatch({ type: "SET_DAILY_LIMIT", payload: limit });
  };

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        login,
        logout,
        deposit,
        withdraw,
        resetDailyLimit,
        setDailyLimit,
        toggleDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
