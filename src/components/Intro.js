import React from "react";

export default function Intro(props) {
  return (
    <div className="intro-page">
      <h1 className="page-title">Quizzical</h1>
      <p className="description">Some description if needed</p>
      <button className="btn-start" onClick={() => props.setShowQuiz(true)}>
        Start quiz
      </button>
    </div>
  );
}
