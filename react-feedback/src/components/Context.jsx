import React, { useState, useEffect } from "react";

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const API_URL = "http://localhost:5000/feedbacks";
  const maxRating = 10;
  const minFeedbackLength = 10;
  const feedbackFormMain = "feedback-form--main";
  const ratingMainContainer = "rating-container--main";
  const feedbackMainArea = "feedback-area--main";
  const feedbackFormSubmitted = "feedback-form";
  const ratingSubmittedContainer = "feedback-rating";
  const feedbackSubmittedArea = "feedback-text";
  const [feedbackArr, setFeedbackArr] = useState(() => []);
  const [isAutoFocus, setAutoFocus] = useState(() => true);
  const [isSubmitted, setIsSubmitted] = useState(() => false);

  useEffect(() => {
    isSubmitted && setIsSubmitted((prev) => !prev);
  }, [isSubmitted]);

  useEffect(() => {
    getRequest(API_URL);
  }, []);

  const fetchData = async (url, options) => {
    try {
      const request = await fetch(url, options);
      const response = await request.json();
      return await response;
    } catch ({ name, message }) {
      console.log(`${name}: ${message}`);
    }
  };

  const getRequest = async (url) => {
    const data = await fetchData(url);
    setFeedbackArr(data.reverse());
  };

  const postRequest = async (url, body) => {
    fetchData(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const putRequest = async (url, id, body) => {
    fetchData(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const deleteRequest = async (url, id) => {
    fetchData(`${url}/${id}`, { method: "DELETE" });
  };

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
    if (rating && feedback.length > minFeedbackLength) return true;
  };

  const createFeedback = (newFeedback) => {
    setFeedbackArr((prev) => [newFeedback, ...prev]);
    postRequest(API_URL, newFeedback);
  };

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

  const updateFeedback = ({ id, rating, feedback }) => {
    setFeedbackArr((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rating, feedback } : item
      )
    );
    putRequest(API_URL, id, { id, rating, feedback });
  };

  const deleteFeedback = (id) => {
    setFeedbackArr((prev) => prev.filter((item) => item.id !== id));
    deleteRequest(API_URL, id);
  };

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
        isAutoFocus,
        isSubmitted,
        setIsSubmitted,
        getFeedbackData,
        validateFeedback,
        createFeedback,
        resetFeedbackSection,
        updateFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider };
export default Context;
