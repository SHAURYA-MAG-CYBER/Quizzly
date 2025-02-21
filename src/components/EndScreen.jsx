// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

function EndScreen({score, totalQuestions, username, startTime, onRestart, onHome }) {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    return (
        <div className="container text-center vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>Quiz Completed!</h1>
            <p><strong>{username}</strong>, you answered <strong>{score}</strong> out of <strong>{totalQuestions}</strong> questions correctly.</p>
            <h2>Your Score: {score} point</h2>
            <p>Time Taken: {timeTaken} seconds</p>

            <button className="btn btn-primary mt-3" onClick={onRestart}>
                Try Again
            </button>
            <button className="btn btn-success mt-3" onClick={onHome}>
                Return to Home
            </button>
        </div>
    );
}

EndScreen.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired,
    onHome: PropTypes.func.isRequired,
  };

export default EndScreen;