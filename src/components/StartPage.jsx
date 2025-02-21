// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./QuizStyle.css";
import { getAttempts, clearAttempts } from "../utils/indexedDB";

function StartPage({ onStart }) {
  const [username, setUsername] = useState("");
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    async function fetchAttempts() {
      const data = await getAttempts();
      setAttempts(data.sort((a, b) => b.score - a.score)); // Sort by score
    }
    fetchAttempts();
  }, []);

  const clearLeaderboard = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear the leaderboard?");
    if (confirmClear) {
      await clearAttempts();
      setAttempts([]); // Clear state as well
    }
  };

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
      <h2 className="mt-4">Leaderboard</h2>
      <div className="leaderboard-container">
        {attempts.length === 0 ? (
          <p>No attempts yet. Try the quiz!</p>
        ) : (
            <>
              <ul className="list-group leaderboard-list">
              {attempts.map((attempt, index) => (
              <li key={index} className="list-group-item">
                <strong>{attempt.username}</strong> - {attempt.score} pts
                <br />
                {attempt.date} | Time Taken: {attempt.timeTaken}s
               </li>
                ))}
              </ul>
              {/* ✅ Clear Leaderboard Button */}
              <button className="btn btn-danger mt-3" onClick={clearLeaderboard}>
              Clear Leaderboard
              </button>
            </>
          )}
      </div>
    </div>
  );
}

StartPage.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartPage;
