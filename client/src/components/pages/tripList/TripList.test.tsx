import { render, screen } from "@testing-library/react";
import TripList from "./TripList";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { mockTripList } from "../../../utils/utils";
import axios from "axios";

jest.mock("axios");

global.matchMedia =
  global.matchMedia ||
  function() {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("CourseList", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders a list of trips", async () => {
    const response = { data:  mockTripList };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={[`/trips`]}>
          <Routes>
            <Route path="/trips" element={<TripList />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );
    await screen.findByText("Kyiv");
    expect(screen.getByText("Kyiv")).toBeInTheDocument();
  });
});
