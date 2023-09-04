/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from "react";

export default function PracticePage({
  setUpdateUserRecord,
  setDisplayWord,
  arrayOfSelectedWords,
  data,
  userId,
}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [theWord, setTheWord] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctWordsList, setCorrectWordsList] = useState([]);
  const [wrongWordsList, setWrongWordsList] = useState([]);

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
    setAnswer("");
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

  async function sessionRecord(sessionData) {
    const response = await fetch(
      "https://spelling-server.glitch.me/session-Record",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      }
    );

    console.log(response);

    if (response.ok) {
      getUserOverallProgressData(userId);
      //alert("session Data is recorded");
    } else {
      alert("something is wrong have a look");
      console.log("data not recorded");
    }
  }

  async function getUserOverallProgressData(user_id) {
    try {
      // Perform asynchronous operations, such as fetching data
      const response = await fetch(
        `https://spelling-server.glitch.me/overall_progress_data/${user_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch progress data");
      }

      const overallProgressData = await response.json();
      setUpdateUserRecord(overallProgressData);
    } catch (error) {
      console.error(error);
      // Handle the error here if needed
    }
  }

  // store session data into one object and then send this object to the backend
  const sessionData = {
    userId,
    correctSpeltWords: correctWordsList.join(","),
    wrongSpeltWords: wrongWordsList.join(","),
    countedCorrectWords: correctWordsList.length,
    countedWrongWords: wrongWordsList.length,
    get total() {
      return this.countedCorrectWords + this.countedWrongWords;
    },
    get correct() {
      return this.countedCorrectWords - this.countedWrongWords;
    },
    get session_accuracy_percentage() {
      return (this.correct / this.total) * 100;
    },
  };

  console.log(theWord);

  const submitSessionRecordHandle = async (e) => {
    e.preventDefault();

    await sessionRecord(sessionData);

    setDisplayWord(true);
    setStart("");
    setEnd("");
    setTheWord("");
    setAnswer("");
    setCorrectWordsList([]);
    setWrongWordsList([]);
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
        setCorrectWordsList([...correctWordsList, answer]);
        spell.text = "Correct";
        speechSynthesis.speak(spell);

        getNewWordButton.current.focus();
        setAnswer("");
      }

      if (theWord.trim().toLowerCase() !== answer.trim().toLowerCase()) {
        setWrongWordsList([...wrongWordsList, answer]);
        spell.text = "Not yet";
        speechSynthesis.speak(spell);

        getNewWordButton.current.focus();
        setAnswer("");
      }
    }

    if (answer.trim().toLowerCase() === "") {
      setWrongWordsList([...wrongWordsList, answer]);
      spell.text = "...you wrote nothing!";
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

  function onClickFunction() {
    getWordsToPractice();
    setDisplayWord(false);
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

      {/* <p>Well done so far {correctWordsList.length}</p>

      <p>Wrong Answers {wrongWordsList.length}</p> */}

      <button onClick={submitSessionRecordHandle}>Save Session Record</button>
      <button
        ref={getNewWordButton}
        name="getNewWordbutton"
        id="getNewWordbutton"
        onClick={onClickFunction}
      >
        Get New Word
      </button>
    </div>
  );
}
