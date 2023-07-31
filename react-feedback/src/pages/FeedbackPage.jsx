import React from "react";
import { ContextProvider } from "../components/Context";
import FeedbackSection from "../components/FeedbackSection";
import FeedbackStatisticSection from "../components/FeedbackStatisticSection";
import FeedbackListSection from "../components/FeedbackListSection";

const FeedbackPage = () => {
  return (
    <>
      <main>
        <ContextProvider>
          <h1>Rate us</h1>
          <FeedbackSection />
          <FeedbackStatisticSection />
          <FeedbackListSection />
        </ContextProvider>
      </main>
    </>
  );
};

export default FeedbackPage;
