// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuizStyle.css";
import Leaderboard from "./Leaderboard"; 
function StartPage({ onStart }) {
  const [username, setUsername] = useState("");

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center mt-5">
      <h1 className="mt-5">Welcome to the Quiz!</h1>
      <p>This quiz consists of multiple-choice and text-based questions.</p>
      <p>You will have **30 seconds** per question.</p>
      <p>Try to get the highest score and compete in the leaderboard!</p>

      {/* Username Input */}
      <input
        type="text"
        className="form-control mt-3 w-50 text-center"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={() => onStart(username)}
        disabled={!username.trim()}
      >
        Start Quiz
      </button>

      {/* Leaderboard Display */}
      <Leaderboard/>
    </div>
  );
}

StartPage.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartPage;
