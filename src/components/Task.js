//Komponent wyświetlający zadanie
import React from "react";

function Task({ question }) {
  return (
    <div className="task-container">
      <h2>{question}</h2>
    </div>
  );
}

export default Task;
