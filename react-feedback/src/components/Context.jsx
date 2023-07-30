import React, { useState, useEffect } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const maxRating = 10;
  const minFeedbackLength = 10;
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
  const [isAutoFocus, setAutoFocus] = useState(() => true);
  const [isSubmitted, setIsSubmitted] = useState(() => false);

  useEffect(() => {
    isSubmitted && setIsSubmitted((prev) => !prev);
  }, [isSubmitted]);

  const getFeedbackData = (formObj, ratingContainer, feedbackContainer) => {
    const ratingContainerArr = [...formObj[ratingContainer]];
    const checkedObj = ratingContainerArr.find(({ checked }) => checked);
    const textarea = formObj[feedbackContainer];

    const rating = checkedObj ? +checkedObj.value : 0;
    const feedback = textarea.value;
    return { rating, feedback };
  };

  const validateFeedback = (rating, feedback, minFeedbackLength) => {
    feedback = feedback.trim();
    // add editional messages for better UX
    if (rating && feedback.length > minFeedbackLength) return true;
  };

  const createFeedback = (newFeedback) =>
    setFeedbackArr((prev) => [newFeedback, ...prev]);

  const resetFeedbackSection = (
    formObj,
    ratingContainer,
    feedbackContainer
  ) => {
    const ratingContainerArr = [...formObj[ratingContainer]];
    const checkedObj = ratingContainerArr.find(({ checked }) => checked);
    const textarea = formObj[feedbackContainer];

    if (checkedObj) checkedObj.checked = false;
    textarea.value = "";
  };

  const updateFeedback = ({ id, rating, feedback }) =>
    setFeedbackArr((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rating, feedback } : item
      )
    );

  const removeFeedback = (id) =>
    setFeedbackArr((prev) => prev.filter((item) => item.id !== id));

  useEffect(() => {
    feedbackArr.length && console.log(feedbackArr);
  }, [feedbackArr]);

  return (
    <Context.Provider
      value={{
        maxRating,
        minFeedbackLength,
        feedbackFormMain,
        ratingMainContainer,
        feedbackMainArea,
        feedbackFormSubmitted,
        ratingSubmittedContainer,
        feedbackSubmittedArea,
        feedbackArr,
        // text,
        // setText,
        isAutoFocus,
        setAutoFocus,
        isSubmitted,
        setIsSubmitted,
        getFeedbackData,
        validateFeedback,
        createFeedback,
        resetFeedbackSection,
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
