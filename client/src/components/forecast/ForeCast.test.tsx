import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import ForeCast from "./ForeCast";
import { card, weekForeCast } from "../../utils/utils";

jest.mock("axios");

describe("ForeCast component", () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });
    
      afterEach(() => {
        jest.restoreAllMocks();
      });

  test("renders ForeCast component with mock data", async () => {
    const response = { data: { days: weekForeCast } };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);

    render(<ForeCast selectedCard={card} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByTestId("week-forecast")).toBeInTheDocument();
  });
});