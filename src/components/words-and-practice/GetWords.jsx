import React from "react";
import { useState, useEffect } from "react";
import PracticePage from "./PracticePage";
import { FaUserAlt } from "react-icons/fa";
//import { getSelectedWords } from "../middlewares/Functions";
import "./getwords.css";

function GetWords({ userInfo }) {
  const [data, setData] = useState([]);
  const [clickedWords, setClickedWords] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  //const [userId, setUserId] = useState("");
  async function fetchWords() {
    try {
      const response = await fetch(
        "https://statutory-spelling-server.glitch.me/words"
      );
      const words = await response.json();
      setData(words);
    } catch (err) {
      console.error(err);
    }
  }

  if (!!userInfo) console.log(userInfo);

  useEffect(() => {
    fetchWords();
    if (!!userInfo) {
      setUserFirstName(userInfo.firstname);
      setUserLastName(userInfo.lastname);
      //setUserId(userInfo.id);
    }
  }, [userInfo]);

  const userFullname = `${userFirstName} ${userLastName}`;
  const arrayOfSelectedWords = [...clickedWords]; //.join(", ");

  return (
    <>
      <p>
        <FaUserAlt /> {userFullname}
      </p>
      <p>
        Choose the range of words you would like practice and then click the{" "}
        <strong>
          <span>Get New Word</span>
        </strong>{" "}
        button. After that keep pressing Enter key when you want to submit and
        get new word to practice
      </p>
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
