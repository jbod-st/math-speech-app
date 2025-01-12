//Obsługa syntezy mowy
export function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pl-PL"; // Polski język
    synth.speak(utterance);
  }
  