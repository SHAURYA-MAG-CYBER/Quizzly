// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function Leaderboard({onBack}) {
    const attempts = JSON.parse(localStorage.getItem("quizAttempts")) || [];

    return (
        <div className="container text-center vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>Leaderboard</h1>
            {attempts.length === 0 ? (
                <p>No attempts yet. Try the quiz!</p>
            ):(
                <ul className="list-group w-50">
                    {attempts.map((score, index) => (
                        <li key={index} className="list-group-item">
                            Rank {index + 1}: {score} points
                        </li>
                    ))}
                </ul>
            )}
            <button className="btn btn-primary mt-4" onClick={onBack}>
                Back to Home
            </button>
        </div>
    );
}

Leaderboard.propTypes = {
    onBack: PropTypes.func.isRequired,
  };

export default Leaderboard;