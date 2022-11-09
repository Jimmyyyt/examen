import "../App.css";
import { questions } from "../helpers/Questions";
import { useState } from "react";

import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { score, setScore, gameState, setGameState } =
    useContext(GameStateContext);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextQuestion = () => {
    if (questions[currentQuestion].answers === optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (questions[currentQuestion].answers === optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <h1>{questions[currentQuestion].question}</h1>
      <div className="questions">
        <button
          onClick={() => {
            chooseOption("answer");
          }}
        >
          {questions[currentQuestion].answers}
        </button>
        <button
          onClick={() => {
            chooseOption("answer");
          }}
        >
          {questions[currentQuestion].optionB}
        </button>
        <button
          onClick={() => {
            chooseOption("trackingId");
          }}
        >
          {questions[currentQuestion].optionC}
        </button>
        <button
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {questions[currentQuestion].optionD}
        </button>
      </div>

      {currentQuestion === questions.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
