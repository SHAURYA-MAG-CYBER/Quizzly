import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./QuizStyle.css";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group"; 


const API_URL = "http://localhost:5000/api/quiz/all";

function Quiz({ username, startTime, onEnd }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [message, setMessage] = useState(""); 
  const [isDisabled, setIsDisabled] = useState(false); 
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false); 
  const [isCountingDown, setIsCountingDown] = useState(true); 
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(true);
  const questionRef = useRef(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch(error) {
        console.log("Error fetching quizzes:",error);
        setLoading(false);
      }
    };
    fetchQuizzes();
  },[]);

  useEffect(() => {
    if (countdown > 0) {
      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownTimer);
            setIsCountingDown(false); // ✅ Start quiz when countdown finishes
            setShowQuestion(true);
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(countdownTimer); // ✅ Cleanup interval
    }
  }, [countdown]);

  useEffect(() => {
    
    if(isSubmitted || isCountingDown || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          setIsDisabled(true);
          setMessage(`Time's up! The correct answer is ${questions[currentQuestion].correctAnswer}.`);
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1)); // Decrease smoothly every 100ms
      });
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, [currentQuestion, isSubmitted, isCountingDown, questions]);

  const handleSubmit = () => {
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
    setShowQuestion(false);
    setTimeout(() => {
      if(currentQuestion>=questions.length-1) {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        // const date = new Date().toLocaleString();
        handleQuizEnd(score, questions.length, timeTaken);
        onEnd(score, questions.length, timeTaken);
        return;
      }
      setCurrentQuestion((prev) => prev+1);   
      setSelectedAnswer(null); // Clears the previous selection
      setIsSubmitted(false); // Allows new submission
      setIsDisabled(false); // Re-enables options
      setMessage(""); // Clears previous feedback message
      setTimeLeft(30); // Resets timer for new question
      setTimeout(() => {
        setShowQuestion(true);
      }, 50);
    }, 300);
  }

  const handleQuizEnd = (score, totalQuestions, timeTaken) => {
    const attemptData = {
      username,
      score,
      totalQuestions,
      timeTaken,
      date: new Date().toLocaleString(), // Store attempt date
    };
  
    // Send attempt to MongoDB
    fetch("http://localhost:5000/api/attempt/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attemptData),
    })
      .then((response) => response.json())
      .then(() => console.log("✅ Attempt saved successfully"))
      .catch((error) => console.error("❌ Error saving attempt:", error));
  };
  
  
  // Function to save scores in Local Storage
  // const saveAttempt = (score) => {
  //   const endTime = Date.now();
  //   const timeTaken = Math.floor((endTime - startTime)/1000);
  //   const date = new Date().toLocaleString();

  //   const attempts = JSON.parse(localStorage.getItem("quizAttempts")) || [];
  //   attempts.push({ username, score, date, timeTaken });
  //   attempts.sort((a, b) => b.score - a.score); // Sort scores from best to worst
  //   localStorage.setItem("quizAttempts", JSON.stringify(attempts));
  // };

  if (loading) return <h2 className="text-center mt-5">Loading Questions...</h2>;
  if (questions.length === 0) return <h2 className="text-center mt-5">No quizzes available.</h2>;

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card text-center p-4 shadow"
        style={{ width: "90%", maxWidth: "600px" }}
      >
        {isCountingDown ? (
          <div className="countdown">{countdown > 0 ? countdown : "Start!"}</div>
        ) : (
          <>
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

            {/* Animated Question Transition */}
            <CSSTransition in={showQuestion} timeout={500} classNames="fade" nodeRef={questionRef} unmountOnExit>
              <div ref={questionRef}>
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
                value={selectedAnswer || ""}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                disabled={isDisabled}
                />
                )}
              </div>
            </CSSTransition>

            {/* Submit Button */}
            <button
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
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
          </>
        )}  
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
