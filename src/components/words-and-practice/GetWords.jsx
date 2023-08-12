import React from "react";
import { useState, useEffect } from "react";
import PracticePage from "./PracticePage";
import { FaUserAlt } from "react-icons/fa";
import "./getwords.css";

function GetWords({ user }) {
  const [data, setData] = useState([]);
  const [clickedWords, setClickedWords] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userId, setUserId] = useState("");

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
    if (!!user) {
      setUserFirstName(user.firstname);
      setUserLastName(user.lastname);
      setUserId(user.id);
    }
   
  }, [user]);

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
      <PracticePage arrayOfSelectedWords={arrayOfSelectedWords} data={data} userId={userId} />
    </>
  );
}

export default GetWords;
