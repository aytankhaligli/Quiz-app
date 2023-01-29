import React from "react";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";
import blobsblue from "./images/blobs-blue.png";
import blobsyellow from "./images/blobs-yellow.png";

export default function App() {
  const [showQuiz, setShowQuiz] = React.useState(false);
  return (
    <div className="page">
      <img src={blobsblue} className="blob-img-blue quiz-blue" />

      {showQuiz ? <Quiz /> : <Intro setShowQuiz={setShowQuiz} />}
      <img src={blobsyellow} className="blob-img-yellow quiz-yellow" />
    </div>
  );
}
