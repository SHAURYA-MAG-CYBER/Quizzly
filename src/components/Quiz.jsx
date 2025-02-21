import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizStyle.css";
import PropTypes from "prop-types";

const questions = [
  {
    id: 1,
    type: "mcq",
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: "Mercury",
  },
  {
    id: 2,
    type: "mcq",
    question:
      "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
  },
  {
    id: 3,
    type: "text", // Text-based input question
    question: "What is the capital of France?",
    correctAnswer: "Paris",
  },
];

function Quiz({ username, startTime, onEnd }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [message, setMessage] = useState(""); // Message for user feedback
  const [isDisabled, setIsDisabled] = useState(false); // Disable options after submit
  const [score, setScore] = useState(0);


  useEffect(() => {
    
    if(isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          setIsDisabled(true);
          setMessage(`Time's up! The correct answer is ${questions[currentQuestion].correctAnswer}.`);
          return 0;
        }
        return prev - 0.1; // Decrease smoothly every 100ms
      });
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, [currentQuestion, isSubmitted]);

  const handelSubmit = () => {
    setIsSubmitted(true);
    setIsDisabled(true);

    if(selectedAnswer.trim().toLowerCase() === questions[currentQuestion].correctAnswer.toLowerCase()) {
        setScore((prevScore) => prevScore+1);
        setMessage("Correct! 🎉");
    } else {
        setMessage(`Incorrect! The correct answer is ${questions[currentQuestion].correctAnswer}.`);
    }
  };

  const handleNext = () => {
    if(currentQuestion>=questions.length-1) {
        saveAttempt(score);
        onEnd(score, questions.length);
        return;
    }
        
    setCurrentQuestion((prev) => prev+1);   

    setSelectedAnswer(""); // Clears the previous selection
    setIsSubmitted(false); // Allows new submission
    setIsDisabled(false); // Re-enables options
    setMessage(""); // Clears previous feedback message
    setTimeLeft(30); // Resets timer for new question
  };
  
  // Function to save scores in Local Storage
  const saveAttempt = (score) => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime)/1000);
    const date = new Date().toLocaleString();

    const attempts = JSON.parse(localStorage.getItem("quizAttempts")) || [];
    attempts.push({ username, score, date, timeTaken });
    attempts.sort((a, b) => b.score - a.score); // Sort scores from best to worst
    localStorage.setItem("quizAttempts", JSON.stringify(attempts));
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card text-center p-4 shadow"
        style={{ width: "90%", maxWidth: "600px" }}
      >
        {/* Timer Progress Bar */}
        <div className="progress mb-3">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{
              width: `${isSubmitted ? (timeLeft / 30) * 100 : (timeLeft/30)*100}%`,
              transition: "width 0.1s linear",
            }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="mb-4">{questions[currentQuestion].question}</h2>

        {/* Answer Options (2x2 Grid, Text Input for Text-based) */}
        {questions[currentQuestion].type==="mcq" ? (
            <div className="row g-3">
            {questions[currentQuestion].options.map((option, index) => {
              const isCorrect = option === questions[currentQuestion].correctAnswer;
              const isSelected = option === selectedAnswer;
  
              return (
                  <div className="col-6" key={index}>
                      <button
                          className={`btn btn-lg w-100 ${
                              isSubmitted
                                  ? isSelected && isCorrect
                                      ? "btn-success animate-transition"
                                      : isSelected
                                      ? "btn-danger animate-transition"
                                      : isCorrect
                                      ? "btn-success animate-transition"
                                      : "btn-outline-secondary faded"
                                  : isSelected
                                  ? "btn-info"
                                  : "btn-outline-secondary"
                          } ${timeLeft === 0 && isCorrect ? "border-green" : ""} `}
                          onClick={() => {
                              if(!isDisabled) setSelectedAnswer(option);
                          }}
                          disabled={isDisabled} 
                      >
                      {option}
                      </button>
                  </div>
              );
            })}
          </div>
        ): (
            <input
            type="text"
            className="form-control text-center mt-3"
            placeholder="Type your answer here..."
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={isDisabled}
            />
        )}
        

        {/* Submit Button */}
        <button
          className="btn btn-primary mt-3"
          onClick={handelSubmit}
          disabled={!selectedAnswer || isSubmitted}
        >
          Submit
        </button>

        {/* Display Message */}
        {message && <div className="alert alert-info mt-3">{message}</div>}
        
        {/* Score Display */}
        <div className="mt-2">
          <h5>Player: {username}</h5>
          <h5>Score: {score}/{questions.length}</h5>
        </div>

        {/* Next Button */}
        <button
          className="btn btn-success mt-3"
          onClick={handleNext}
          disabled={!isSubmitted && timeLeft > 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

Quiz.propTypes = {
    username: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    onEnd: PropTypes.func.isRequired,
  };

export default Quiz;
