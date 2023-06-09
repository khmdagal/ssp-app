/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from "react";

export default function PracticePage({ arrayOfSelectedWords, data, userId }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [theWord, setTheWord] = useState("");
  const [answer, setAnswer] = useState("");
  const [correntWordsList, setCorrentWordsList] = useState([]);
  const [wrongWordsList, setWrongWordsList] = useState([]);
  // const [sessionAccuracy, setSessionAccuracy] = useState(0)

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

  async function sessionRecord(sessionData) {
    const response = await fetch("http://localhost:8080/session-Record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    });

    console.log(response);

    if (response.ok) {
      alert("session Data is recorded");
    } else {
      alert("something is wrong have a look");
      console.log("data not recorded");
    }
  }

  // this is to make the joined words as one variable name, means not using join(",") method in the submitsession fucntions
  const correctSpeltWords = correntWordsList.join(",");
  const wrongSpeltWords = wrongWordsList.join(",");
  const countedCorrectWord = correntWordsList.length;
  const countedWrongWord = wrongWordsList.length;
  const sessionAccuracy = countedCorrectWord - countedWrongWord;
 
  console.log(theWord);

  const submitSessionRecordHandle = async (e) => {
    e.preventDefault();
    await sessionRecord({
      userId,
      correctSpeltWords,
      wrongSpeltWords,
      countedCorrectWord,
      countedWrongWord,
      sessionAccuracy,
    });
  };

  function removeTheWord(word, array) {
    const index = array.indexOf(word);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  function checkTheAnswer() {
    if (theWord.trim() !== "" && answer.trim() !== "") {
      if (theWord.trim().toLowerCase() === answer.trim().toLowerCase()) {
        setCorrentWordsList([...correntWordsList, answer]);
        spell.text = "Correct";
        speechSynthesis.speak(spell);
        setAnswer("");
        getNewWordButton.current.focus();
      }

      if (theWord.trim().toLowerCase() !== answer.trim().toLowerCase()) {
        setWrongWordsList([...wrongWordsList, answer]);
        spell.text = "Not yet";
        speechSynthesis.speak(spell);
        setAnswer("");
        getNewWordButton.current.focus();
      }
    }

    if (answer.trim().toLowerCase() === "") {
      setWrongWordsList([...wrongWordsList, answer]);
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

      <p>Correct Ansers {correntWordsList.join(",")}</p>

      <p>Wrong Ansers {wrongWordsList.join(",")}</p>

      <button onClick={submitSessionRecordHandle}>Save Session Record</button>
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
