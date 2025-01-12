import React, { useEffect, useState } from "react";
import nlp from "compromise"; // Import biblioteki Compromise

function SpeechButton({ onAnswer }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Funkcja do wyodrębniania liczby za pomocą Compromise.js
  function extractNumberWithNLP(text) {
    const doc = nlp(text); // Przetwarzanie tekstu
    const numbers = doc.numbers().out("array"); // Wyodrębnij liczby
    return numbers.length > 0 ? numbers[0] : null; // Zwróć pierwszą liczbę lub null
  }

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "pl-PL";
    recognition.interimResults = false;

    if (isListening) {
      recognition.start();
    }

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);

      // Wyodrębnij liczbę z użyciem NLP
      const extractedNumber = extractNumberWithNLP(result);
      if (extractedNumber) {
        onAnswer(extractedNumber); // Przekaż wyodrębnioną liczbę
      } else {
        alert("Nie znaleziono liczby w odpowiedzi.");
      }
    };

    recognition.onerror = (err) => {
      console.error(err);
    };

    return () => {
      recognition.stop();
    };
  }, [isListening, onAnswer]);

  return (
    <div>
      <button onClick={() => setIsListening(!isListening)}>
        {isListening ? "Zatrzymaj" : "Mów"}
      </button>
      <p>Odpowiedź: {transcript}</p>
    </div>
  );
}

export default SpeechButton;
