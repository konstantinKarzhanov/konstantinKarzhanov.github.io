import React from "react";
import { ContextProvider } from "./components/Context";
import FeedbackSection from "./components/FeedbackSection";
import FeedbackStatisticSection from "./components/FeedbackStatisticSection";
import FeedbackListSection from "./components/FeedbackListSection";

const App = () => {
  return (
    // btnDisabled --> how to do validation before Submit and not inside it?
    // need to check the length statically for submitted elements
    // textarea doesn't change its size after submitting
    <>
      <header></header>
      <main>
        <ContextProvider>
          <h1>Rate us</h1>
          <FeedbackSection />
          <FeedbackStatisticSection />
          <FeedbackListSection />
        </ContextProvider>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
