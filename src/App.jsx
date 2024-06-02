import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider, UserContext } from "./context/UserContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header"; // Import the Header component

const AppContent = () => {
  const { state } = useContext(UserContext);

  return (
    <div className={state.darkMode ? "dark" : ""}>
      <Header />
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
};

export default App;
