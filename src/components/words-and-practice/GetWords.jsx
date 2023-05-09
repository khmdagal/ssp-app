import React from "react";
import { useState, useEffect } from "react";
import PracticePage from "./PracticePage";
//import { getSelectedWords } from "../middlewares/Functions";
import "./getwords.css";

function GetWords() {
  const [data, setData] = useState([]);
  const [clickedWords, setClickedWords] = useState("");
  async function fetchWords() {
    try {
      const response = await fetch("http://localhost:8080/words");
      const words = await response.json();
      setData(words);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const arrayOfSelectedWords = [...clickedWords]; //.join(", ");

  return (
    <>
      <h1>Practice App</h1>
      <div className="words-container">
        {data.length === 0 ? (
          <p>Loading...</p>
        ) : (
          data.map((word) => (
            <div key={word.word_id}>
              <span className="word-container">
                <input
                  onClick={(e) => {
                    const checkedWord = e.target.value;
                    const isChecked = e.target.checked;
                    setClickedWords((prevSelectedWordsArr) =>
                      isChecked
                        ? [...prevSelectedWordsArr, checkedWord]
                        : prevSelectedWordsArr.filter(
                            (word) => word !== checkedWord
                          )
                    );
                  }}
                  id={word.word_id}
                  type="checkbox"
                  value={word.word}
                />
                <label htmlFor={word.word_id}>
                  {word.word_id}: {word.word}
                </label>
              </span>
            </div>
          ))
        )}
      </div>
      <PracticePage arrayOfSelectedWords={arrayOfSelectedWords} data={data} />
    </>
  );
}

export default GetWords;
