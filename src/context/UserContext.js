import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  user: null,
  balance: 2000, // Initial
  dailyLimit: 500,
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

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
