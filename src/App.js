import React, { useState } from "react";
import Task from "./components/Task";
import SpeechButton from "./components/SpeechButton";
import tasks from "./data/tasks.json";
import { speakText } from "./utils/speech";
import "./assets/styles.css";

function App() {
  // Funkcja losująca zadanie z danego poziomu
  const getRandomTask = (level) => {
    const levelTasks = tasks.filter((task) => task.level === level);
    
    // Jeśli nie ma dostępnych zadań na danym poziomie, zwraca dowolne z poziomu
    if (levelTasks.length === 0) return null;
  
    const availableTasks = levelTasks.filter((task) => !usedTaskIds.includes(task.id));
  
    if (availableTasks.length === 0) {
      // Reset listy użytych zadań, gdy wszystkie zostały wykorzystane
      setUsedTaskIds([]);
      return getRandomTask(level);
    }
  
    const randomTask = availableTasks[Math.floor(Math.random() * availableTasks.length)];
    setUsedTaskIds((prevIds) => [...prevIds, randomTask.id]);
    return randomTask;
  };
  

  const [usedTaskIds, setUsedTaskIds] = useState([]);
  const [currentTask, setCurrentTask] = useState(() => getRandomTask(1) || tasks[0]);
  const [streak, setStreak] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true); // Dodajemy ekran startowy
  

// App.js
const filterNoise = (input) => {
  const noiseWords = ["odpowiedź", "jest", "to"];
  let filteredInput = input.toLowerCase().trim();
  noiseWords.forEach((word) => {
    filteredInput = filteredInput.replace(word, "").trim();
  });
  return filteredInput;
};



  const handleAnswer = (userAnswer) => {
    const filteredAnswer = filterNoise(userAnswer);
    if (filteredAnswer === currentTask.answer) {
      setStreak(streak + 1);
      alert("Poprawna odpowiedź!");

      if (streak + 1 === 5) {
        setGameCompleted(true);
        speakText("Gratulacje rozwiązano prawidłowo 5 zadań!");
        
        return;
      }

      const nextTask = getRandomTask(Math.min(currentTask.level + 1, 3));
      setCurrentTask(nextTask);
      speakText(formatTaskForSpeech(nextTask.question));
    } else {
      setStreak(0);
      alert("Błędna odpowiedź. Streak zresetowany.");
      currentTask.level = 1;
    }
  };

  const resetGame = () => {
    setStreak(0);
    currentTask.level = 1;
    setGameCompleted(false);
    const firstTask = getRandomTask(1);
    setCurrentTask(firstTask);
    speakText(formatTaskForSpeech(firstTask.question));
  };

  const formatTaskForSpeech = (question) => {
    return question
      .replace("+", "plus")
      .replace("-", "minus")
      .replace("*", "razy")
      .replace("/", "podzielić przez");
  };



  return (
    <div className="app">
      {showStartScreen ? (
        <div className="start-screen">
          <h1>Matematyczny Quiz</h1>
          <p>Spróbuj rozwiązać 5 zadań z rzędu poprawnie!</p>
          <button onClick={() => setShowStartScreen(false)}>Rozpocznij Quiz</button>
        </div>
      ) : (
        <>
          <h1>Zadanie matematyczne</h1>
          <p>Streak: {streak}</p>
          {!gameCompleted ? (
            <>
              <Task question={currentTask?.question || "Brak zadania"} />
              <SpeechButton onAnswer={handleAnswer} />
            </>
          ) : (
            <>
              <p>Gratulacje rozwiązano prawidłowo 5 zadań!</p>
              <button onClick={resetGame}>Rozpocznij ponownie</button>
            </>
          )}
        </>
      )}
    </div>
  );
  
}

export default App;
