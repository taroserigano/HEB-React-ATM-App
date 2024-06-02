import React from "react";

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-8 mb-4">
      <h1 className="text-3xl font-semibold mb-4">
        About The H-E-B ATM Application
      </h1>
      <p className="text-lg">
        This is a simple ATM application developed with React. Users can log in,
        view their balance, deposit money and withdraw funds within a daily
        limit.
      </p>
    </div>
  );
};

export default About;
