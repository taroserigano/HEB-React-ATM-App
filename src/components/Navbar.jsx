import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import myImage from "../assets/image/heb.png";

const Navbar = () => {
  const { state, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img src={myImage} alt="HEB Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div>
          <Link to="/about" className="text-white font-semibold ml-4">
            About
          </Link>
          {state.pin ? (
            <>
              <span className="text-white font-semibold ml-4">{state.pin}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-500 dark:bg-blue-600 font-semibold text-white ml-4 py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogIn}
                className="bg-blue-500 dark:bg-blue-600 font-semibold text-white ml-4 py-2 px-4 rounded"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
