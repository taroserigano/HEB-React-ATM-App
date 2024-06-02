# H-E-B ATM Application

## Overview

The H-E-B ATM Application is a simple and interactive ATM simulation built with React. The application allows users to:

- Enter a PIN to log in.
- Query and display the current account balance.
- Simulate deposits.
- Simulate withdrawals.
- Set a daily withdrawal limit.
- Toggle dark mode for better user experience in different lighting conditions.

## Features

- **PIN Authentication**: Secure access using a 4-digit PIN.
- **Balance Query**: Display the current balance of the user account.
- **Deposit**: Simulate deposit transactions.
- **Withdraw**: Simulate cash withdrawal transactions with daily limits.
- **Daily Limit**: Set and reset the daily withdrawal limit.
- **Dark Mode**: Toggle dark mode for a comfortable viewing experience.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Context API & useReducer**: For global state management.
- **React Router**: For routing between different pages.
- **Caching User** Data: Save user data and balance in local storage to persist state across page reloads.
