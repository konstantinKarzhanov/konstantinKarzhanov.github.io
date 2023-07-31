import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FeedbackPage from "./FeedbackPage";

describe("Group of tests", () => {
  it("Rate us on the page", () => {
    render(<FeedbackPage />);
    const text = screen.getByText("Rate us");
    expect(text).toBeInTheDocument();
  });

  it("Click", () => {
    render(<FeedbackPage />);
    userEvent.click(screen.getByText("Rate us"));
  });
});
