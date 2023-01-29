import React from "react";
import { nanoid } from "nanoid";
import Question from "./Question";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([]);
  const [showWarning, setShowWarning] = React.useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  React.useEffect(() => {
    if (quiz.length === 0) {
      async function getQuiz() {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await res.json();

        setQuiz(
          data.results.map((data) => {
            return {
              question: data.question,
              correctAnswer: data.correct_answer,
              answers: shuffle([
                data.correct_answer,
                ...data.incorrect_answers,
              ]),
              id: nanoid(),
              selectedAnswer: "",
            };
          })
        );
      }

      getQuiz();
    }
  }, [quiz]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function updateAnswer(currentQuestion, answer) {
    setQuiz((quiz) =>
      quiz.map((questionOb) => {
        return questionOb.question === currentQuestion
          ? { ...questionOb, selectedAnswer: answer }
          : questionOb;
      })
    );
  }
  function checkAnswers() {
    const allAnswered = quiz.every((quiz) => quiz.selectedAnswer);
    setShowWarning(!allAnswered);

    if (allAnswered) {
      quiz.forEach((questionOb) => {
        if (questionOb.selectedAnswer === questionOb.correctAnswer)
          setNumCorrectAnswers((prev) => prev + 1);
      });

      setShowScore(true);
    }
  }
  function playAgain() {
    setQuiz([]);
    setShowScore(false);
    setNumCorrectAnswers(0);
  }
  const questionElement = quiz.map((quiz) => {
    return (
      <div>
        <Question
          key={nanoid()}
          question={quiz.question}
          answers={quiz.answers}
          correctAnswer={quiz.correctAnswer}
          selectedAnswer={quiz.selectedAnswer}
          updateAnswer={updateAnswer}
          showScore={showScore}
        />
      </div>
    );
  });

  return (
    <div className="quiz-page">
      <div>{questionElement}</div>
      {showWarning && <p className="warning">Not all questions answered</p>}
      {quiz.length > 0 && !showScore && (
        <button className="btn-check" onClick={checkAnswers}>

          Check answers
        </button>
      )}

      {showScore && (
        <div className="show-container">
          <p className="score">
            You scored {numCorrectAnswers}/5 correct answers
          </p>
          <button className="btn-play-again" onClick={playAgain}>

            Play again
          </button>
        </div>
      )}
    </div>
  );
}
