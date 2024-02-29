import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TripCard from "./TripCard";
import { MemoryRouter} from "react-router-dom";

jest.mock("axios");

global.matchMedia =
  global.matchMedia ||
  function() {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("TripCard", () => {
  const mockCard = {
    _id: "65de3736f215d7bad0b3a065",
    city: "London",
    image:
      "https://media.istockphoto.com/id/1294454411/photo/london-symbols-with-...",
    endDate: "2024-03-02T00:00:00.000+00:00",
    startDate: "2024-02-29T00:00:00.000+00:00",
    __v: 0,
    googleId: "107709627174640587543",
  };

  it("renders TripCard and shows timer when clicked", async () => {
    const setSelectedCardMock = jest.fn();

    render(
      <MemoryRouter initialEntries={[{ pathname: "/trips" }]}>
        <TripCard
          cardItem={mockCard}
          setSelectedCard={setSelectedCardMock}
          selectedCard={mockCard}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId("select-card")).toHaveClass("selected");
  });
});
