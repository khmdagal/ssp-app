import React from "react";
import { useState, useEffect } from "react";
import PracticePage from "./PracticePage";
//import { FaUserAlt } from "react-icons/fa";
import "./getwords.css";

function GetWords({ user, setUpdateUserRecord, selectedYearsWords }) {
  const [data, setData] = useState([]);
  const [clickedWords, setClickedWords] = useState("");
  const [userId, setUserId] = useState("");
  const [displayWord, setDisplayWord] = useState(true);

  useEffect(() => {
    async function fetchWords() {
      try {
        const response = await fetch(
          `https://spelling-server.glitch.me/words/${selectedYearsWords}`
        );
        const words = await response.json();
        setData(words);
      } catch (err) {
        console.error(err);
      }
    }
    fetchWords();
    if (!!user) {
      setUserId(user.id);
    }
  }, [selectedYearsWords, user]);

  const arrayOfSelectedWords = [...clickedWords]; //.join(", ");

  return (
    <>
      <p>
        Choose the range of words you would like practice and then click the{" "}
        <strong>
          <span>Get New Word</span>
        </strong>{" "}
        button. After that keep pressing Enter key when you want to submit and
        get new word to practice
      </p>
      {displayWord ? (
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
                    value={word[selectedYearsWords]}
                  />
                  <label htmlFor={word.word_id}>
                    {word.word_id}: {word[selectedYearsWords]}
                  </label>
                </span>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Good luck for the practice</p>
      )}
      <PracticePage
        setUpdateUserRecord={setUpdateUserRecord}
        setDisplayWord={setDisplayWord}
        arrayOfSelectedWords={arrayOfSelectedWords}
        data={data}
        userId={userId}
      />
    </>
  );
}

export default GetWords;
