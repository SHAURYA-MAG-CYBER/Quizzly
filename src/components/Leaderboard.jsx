// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {  useState, useEffect } from "react";
import "./QuizStyle.css";
import axios from "../../backend/node_modules/axios";

function Leaderboard({onBack}) {
    const [attempts, setAttempts] = useState([]);

    const clearLeaderboard = async () => {
        const confirmClear = window.confirm("Are you sure you want to clear the leaderboard?");
        if (confirmClear) {
          try {
            await fetch("http://localhost:5000/api/attempt/clear", { method: "DELETE" });
            setAttempts([]); // ✅ Clear frontend state after deletion
            console.log("✅ Leaderboard cleared successfully!");
          } catch (error) {
            console.error("❌ Error clearing leaderboard:", error);
          }
        }
      };

    useEffect(() => {
        axios.get("http://localhost:5000/api/attempt/all")
          .then((res) => {
            console.log("📌 Received attempts from MongoDB:", res.data);
            setAttempts(res.data);
          })
          .catch((err) => console.error("❌ Error fetching attempts:", err));
      }, []);

    return (
        <div className="container text-center vh-auto d-flex flex-column align-items-center justify-content-center ">
            <h2 className="mt-4">Leaderboard</h2>
            <div className="leaderboard-container">
                {attempts.length > 0 ? (
                    <>
                        <ul className="list-group leaderboard-list">
                            {attempts.map((attempt, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>Rank {index + 1}: {attempt.username || "Unknown"}</strong> 
                                    <br />
                                    Score: {attempt.score} pts | Time Taken: {attempt.timeTaken}s  
                                    <br />
                                    Date: {attempt.date}
                                </li>
                            ))}
                        </ul>
                        
                    </>
                ):(
                    <p>No attempts yet. Try the quiz!!!</p>
                )}
            </div>

            <button className="btn btn-danger mt-3" onClick={clearLeaderboard}>
                Clear Leaderboard
            </button>
            
            <button className="btn btn-primary mt-4 d-none" onClick={onBack}>
                Back to Home
            </button>
        </div>
    );
}

Leaderboard.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default Leaderboard;