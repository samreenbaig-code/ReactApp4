import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { VoteProvider } from "../context/VoteContext";
import VoteItem from "../components/VoteItem";

test("renders vote item and increments vote", () => {
  const item = { id: 1, name: "React", votes: 0 };

  render(
    <VoteProvider>
      <VoteItem item={item} />
    </VoteProvider>
  );

  const button = screen.getByRole("button", { name: /vote/i });
  fireEvent.click(button);

  expect(screen.getByText(/Votes:/)).toBeInTheDocument();
});