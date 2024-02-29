import { render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { mockTodayForeCast } from "../../utils/utils";
import TodayForecast from "./TodayForecast";

jest.mock("axios");

jest.mock("../../utils/utils", () => ({
  ...jest.requireActual("../../utils/utils"),
  importSVG: jest.fn().mockResolvedValue("../assets/weather/rain.svg"),
}));

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
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders TodayForecast component with mocked data", async () => {
    const response = { data: { days: [ mockTodayForeCast ] } };
    (axios.get as jest.Mock).mockResolvedValueOnce(response);

    render(
      <RecoilRoot>
        <TodayForecast />
      </RecoilRoot>
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => {
      // Check if the loading element is not present
      expect(screen.queryByTestId('loading')).toBeNull();
  
      // Check if the today-forecast element is present
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByTestId('today-forecast')).toBeInTheDocument();
  
    });;
 
  });
});
