//Główna logika aplikacji
import React, { useState } from "react";
import Task from "./components/Task";
import SpeechButton from "./components/SpeechButton";
import tasks from "./data/tasks.json";
import { speakText } from "./utils/speech";
import "./assets/styles.css";

function App() {
  const [currentTask, setCurrentTask] = useState(tasks[0]);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (userAnswer) => {
    if (userAnswer === currentTask.answer) {
      setStreak(streak + 1);
      alert("Poprawna odpowiedź!");
      const nextTask = tasks.find((task) => task.level === Math.min(currentTask.level + 1, 3));
      if (nextTask) {
        setCurrentTask(nextTask);
        speakText(nextTask.question);
      }
    } else {
      setStreak(0);
      alert("Błędna odpowiedź. Streak zresetowany.");
    }
  };

  return (
    <div className="app">
      <h1>Zadanie matematyczne</h1>
      <p>Streak: {streak}</p>
      <Task question={currentTask.question} />
      <SpeechButton onAnswer={handleAnswer} />
    </div>
  );
}

export default App;
