import React, { useState, useEffect } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const maxRating = 10;
  const ratingMainContainer = "rating-container--main";
  const feedbackMainArea = "feedback-area--main";
  const [feedbackArr, setFeedbacksArr] = useState(() => {
    return [
      // {
      //   id: 1,
      //   rating: 8,
      //   feedback: "first feedback",
      // },
      // {
      //   id: 2,
      //   rating: 4,
      //   feedback: "second feedback",
      // },
      // {
      //   id: 3,
      //   rating: 5,
      //   feedback: "third feedback",
      // },
    ];
  });
  const [text, setText] = useState(() => "");
  const [feedbackObj, setFeedbackObj] = useState(() => ({}));

  useEffect(() => {
    JSON.stringify(feedbackObj) !== "{}" &&
      setFeedbacksArr((prev) => {
        return [...prev, feedbackObj];
      });
  }, [feedbackObj]);

  useEffect(() => {
    feedbackArr.length && console.log(feedbackArr);
  }, [feedbackArr]);

  return (
    <Context.Provider
      value={{
        maxRating,
        ratingMainContainer,
        feedbackMainArea,
        feedbackArr,
        setFeedbacksArr,
        text,
        setText,
        feedbackObj,
        setFeedbackObj,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;
