import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Make sure to add your logo image to the assets folder

const Header = () => {
  const { state, dispatch } = useContext(UserContext);

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  return (
    <header className="bg-red-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="HEB Logo" className="h-10" />
        </Link>
        {state.user && (
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded 
              dark:bg-gray-700 focus:outline-none focus:shadow-outline"
            >
              {state.darkMode ? "🌞" : "🌙"}
            </button>
            <span className="font-semibold">Welcome, Customer!</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
