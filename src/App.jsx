import { useState } from "react";
import Quiz from "./components/Quiz";
import StartPage from "./components/StartPage";
import EndScreen from "./components/EndScreen";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [username, setUsername] = useState("");
  const [startTime, setStartTime] = useState(null);

  return (
    <>
      {currentPage==="start" &&(
        <StartPage onStart={(name) =>{
          setUsername(name);
          setStartTime(Date.now());
          setCurrentPage("quiz");
        }}
        />
      )}
      {currentPage==="quiz" && (
        <Quiz
          username = {username}
          startTime = {startTime}
          onEnd={(score,questions) => {
            setFinalScore(score);
            setTotalQuestions(questions);
            setCurrentPage("end");
          }}
        />
      )}
      {currentPage==="end" && (
        <EndScreen
          score = {finalScore}
          totalQuestions = {totalQuestions}
          username = {username}
          startTime = {startTime}
          onRestart = {() => setCurrentPage("quiz")}
          onHome={() => setCurrentPage("start")}
        />
      )}
    </>
  );
}

export default App;