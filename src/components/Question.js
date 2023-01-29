import React from "react";
import { decode } from "html-entities";

export default function Question(props) {
  function clickAnswer(answer, currentQuestion) {
    props.updateAnswer(currentQuestion, answer);
  }
  const answerElement = props.answers.map((answer, index) => {
    return (
      <button
        className={`answer 
        ${answer === props.selectedAnswer ? "selected" : ""}
        ${props.showScore && answer === props.correctAnswer ? "correct" : ""}
        ${
          props.showScore &&
          answer === props.selectedAnswer &&
          answer !== props.correctAnswer
            ? "false"
            : ""
        }
        ${props.showScore && answer !== props.correctAnswer ? "dimmed" : ""}
        `}
        key={index}
        onClick={() => clickAnswer(answer, props.question)}
        disabled={props.showScore}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="quiz">
      <p className="question">{decode(props.question)}</p>
      <div className="answers-container">{answerElement}</div>
    </div>
  );
}
