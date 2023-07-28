import React from "react";
import { ContextProvider } from "./components/Context";
import FeedbackSection from "./components/FeedbackSection";
import FeedbackListSection from "./components/FeedbackListSection";

const App = () => {
  return (
    // delete, edit, add instead of create?
    // btnDisabled
    // textarea doesn't change its size after submitting
    <>
      <header></header>
      <main>
        <ContextProvider>
          <h1>Rate us</h1>
          <FeedbackSection />
          <FeedbackListSection />
        </ContextProvider>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
