import React, { useState, useEffect } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const maxRating = 10;
  const feedbackFormMain = "feedback-form--main";
  const ratingMainContainer = "rating-container--main";
  const feedbackMainArea = "feedback-area--main";
  const feedbackFormSubmitted = "feedback-form";
  const ratingSubmittedContainer = "feedback-rating";
  const feedbackSubmittedArea = "feedback-text";
  const [feedbackArr, setFeedbackArr] = useState(() => {
    return [
      {
        id: 1,
        rating: 8,
        feedback: "first feedback",
      },
      {
        id: 2,
        rating: 4,
        feedback: "second feedback",
      },
      {
        id: 3,
        rating: 5,
        feedback: "third feedback",
      },
    ];
  });
  // const [text, setText] = useState(() => "");
  const [feedbackObj, setFeedbackObj] = useState(() => ({}));
  const [isAutoFocus, setAutoFocus] = useState(() => true);
  const [isSubmitted, setIsSubmitted] = useState(() => false);

  const updateFeedback = ({ id, rating, feedback }) => {
    setFeedbackArr((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rating, feedback } : item
      )
    );
  };

  const removeFeedback = (id) => {
    setFeedbackArr((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    JSON.stringify(feedbackObj) !== "{}" &&
      setFeedbackArr((prev) => {
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
        feedbackFormMain,
        ratingMainContainer,
        feedbackMainArea,
        feedbackFormSubmitted,
        ratingSubmittedContainer,
        feedbackSubmittedArea,
        feedbackArr,
        // setFeedbackArr,
        // text,
        // setText,
        // feedbackObj,
        setFeedbackObj,
        isAutoFocus,
        setAutoFocus,
        isSubmitted,
        setIsSubmitted,
        updateFeedback,
        removeFeedback,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;
