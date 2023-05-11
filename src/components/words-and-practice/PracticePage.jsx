/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from "react";

export default function PracticePage({ arrayOfSelectedWords, data }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [theWord, setTheWord] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const getNewWordButton = useRef(null);
  const answerInputField = useRef(null);

  let spell = new SpeechSynthesisUtterance();
  spell.rate = 1;
  spell.volume = 5;
  spell.pitch = 1;
  spell.voice = speechSynthesis.getVoices()[0];

  let practiceWords = [];

  function getWordsToPractice() {
    const newArr = data.slice(start - 1, end).map((element) => element.word);
    practiceWords = practiceWords.concat(arrayOfSelectedWords, newArr);
    sayRandomWord(practiceWords);
    return practiceWords;
  }

  const sayRandomWord = (arr) => {
    console.log("-->before", arr);
    if (arr.length !== 0) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      console.log(randomIndex);
      let randomWordFromSelectedWords = arr[randomIndex];

      console.log(randomWordFromSelectedWords);

      spell.text = randomWordFromSelectedWords;
      speechSynthesis.speak(spell);
      setTheWord(randomWordFromSelectedWords);

      removeTheWord(randomWordFromSelectedWords, arr);
      setInterval(() => {
        //console.log("-->after", arr);
      }, 2000);

      answerInputField.current.focus();
      return randomWordFromSelectedWords;
    }
  };

  // Removing the word from the practiceWord array after it is shouted. So that the user only have a change to practice each word once.
  // function removeTheWord(word, array) {
  //   if (word === theWord) {
  //     array.splice(index, 1);
  //   }
  // }
  function removeTheWord(word, array) {
    const index = array.indexOf(word);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function checkTheAnswer() {
    if (theWord.trim() !== "" && answer.trim() !== "") {
      if (theWord.trim().toLowerCase() === answer.trim().toLowerCase()) {
        setCorrectAnswers([...correctAnswers, answer]);
        spell.text = "Correct";
        speechSynthesis.speak(spell);
        setAnswer("");
        getNewWordButton.current.focus();
      }

      if (theWord.trim().toLowerCase() !== answer.trim().toLowerCase()) {
        setWrongAnswers([...wrongAnswers, answer]);
        spell.text = "Not yet";
        speechSynthesis.speak(spell);
        setAnswer("");
        getNewWordButton.current.focus();
      }
    }

    if (answer.trim().toLowerCase() === "") {
      setWrongAnswers([...wrongAnswers, answer]);
      spell.text = "...you wront nothing!";
      speechSynthesis.speak(spell);
      setAnswer("");
      getNewWordButton.current.focus();
    }
  }

  function onEnterKey(e) {
    if (e.key === "Enter") {
      checkTheAnswer();
    }
  }
  //console.log(correctAnswers.join(","));

  return (
    <div>
      <div>
        <label htmlFor="startingWord">
          Start{" "}
          <input
            type="number"
            id="startingWord"
            onChange={(e) => setStart(e.target.value)}
          />
        </label>

        <label htmlFor="endingWord">
          Ending{" "}
          <input
            id="endingWord"
            type="number"
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="question">
          Question{" "}
          <input id="question" type="text" value={theWord} disabled hidden />
        </label>

        <label htmlFor="answer">
          Answer{" "}
          <input
            id="answer"
            type="text"
            value={answer}
            ref={answerInputField}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            onKeyDown={onEnterKey}
          />
        </label>
      </div>

      <p>Correct Ansers {correctAnswers.join(",")}</p>
      <p>Wrong Ansers {wrongAnswers.join(",")}</p>
      {/* <button onClick={checkTheAnswer}>Say The Word</button> */}
      <button
        ref={getNewWordButton}
        name="getNewWordbutton"
        id="getNewWordbutton"
        onClick={getWordsToPractice}
      >
        Get New Word
      </button>
    </div>
  );
}
