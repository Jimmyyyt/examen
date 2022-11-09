import "./App.css";
import { useEffect, useState } from "react";
import { Questions } from "./helpers/Questions";
import QuestionerPage from "./components/QuestionerPage";
import SolverPage from "./components/SolverPage";
import ConnectorPage from "./components/ConnectorPage";
import AdvocatorPage from "./components/AdvocatorPage";
// ['menu', 'playing', 'finished']

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Total score per persontype setters
  const [totalQuestioner, setTotalQuestioner] = useState(0);
  const [totalSolver, setTotalSolver] = useState(0);
  const [totalConnector, setTotalConnector] = useState(0);
  const [totalAdvocator, setTotalAdvocator] = useState(0);

  // Final result setter
  const [education, setEducation] = useState("Education");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  // Sorting Function
  const answerHandler = (questioner, solver, connector, advocator) => {
    setTotalQuestioner(totalQuestioner + questioner);
    setTotalSolver(totalSolver + solver);
    setTotalConnector(totalConnector + connector);
    setTotalAdvocator(totalAdvocator + advocator);

    switch (
      Math.max(totalQuestioner, totalSolver, totalConnector, totalAdvocator)
    ) {
      case totalQuestioner:
        setEducation(<QuestionerPage />);
        break;
      case totalSolver:
        setEducation(<SolverPage />);
        break;
      case totalConnector:
        setEducation(<ConnectorPage />);
        break;
      case totalAdvocator:
        setEducation(<AdvocatorPage />);
        break;

      default:
        break;
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowEducation(true);
    }
  };

  const [resultPage, setResultPage] = useState("");
  const changePage = () => {
    if (education === "Questioner" && showEducation === true) {
      setResultPage(<QuestionerPage />);
    }
    if (education === "Solver" && showEducation === true) {
      setResultPage(<SolverPage />);
    }
    if (education === "Connector" && showEducation === true) {
      setResultPage(<ConnectorPage />);
    }
    if (education === "Advocator" && showEducation === true) {
      setResultPage(<AdvocatorPage />);
    }
  };

  useEffect(() => {
    changePage();
  }, []);

  return (
    <div>
      <div className="main-title">Quiz</div>
      <div
        className="app"
        style={{
          borderRadius: "7px",
          backgroundPosition: "50%",
          // backgroundBlendMode: "normal",
          backgroundImage: `url(${resultPage})`,
        }}
      >
        {showQuiz ? (
          <div>
            {showEducation ? (
              <div className="score-section">
                <br />
                {education}
              </div>
            ) : (
              <>
                <div className="part-two">
                  <div className="question-section">
                    <div className="question-count">
                      <span>Fråga {currentQuestion + 1}</span>/
                      {Questions.length}
                    </div>
                    <div className="question-text">
                      {Questions[currentQuestion].questionText}
                    </div>
                  </div>
                  <div className="answer-section">
                    {Questions[currentQuestion].answers.map((answer, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          answerHandler(
                            answer.questioner,
                            answer.solver,
                            answer.connector,
                            answer.advocator
                          );
                        }}
                      >
                        {answer.answerText}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}{" "}
          </div>
        ) : (
          <>
            <div className="intro-part">
              <div className="intro-text">
                Vet du inte vilken utbildning du ska välja? Gör vårat Quiz!
              </div>
              <button
                className="start-button button-loader"
                onClick={() => setShowQuiz(true)}
              >
                Start
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
