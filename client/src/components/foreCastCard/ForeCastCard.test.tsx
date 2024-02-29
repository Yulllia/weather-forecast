import { render, screen } from "@testing-library/react";
import ForeCastCard from "./ForeCastCard";

jest.mock("../../utils/utils", () => ({
    ...jest.requireActual("../../utils/utils"),
    importSVG: jest.fn().mockResolvedValue("../assets/weather/rain.svg"),
  }));
  
describe("ForeCastCard component", () => {
  it("renders ForeCastCard with correct values", async () => {
    const mockWeatherData = {
        tempmax: 23,
        tempmin: 21,
        temp: 21,
        datetime: "2024-02-28",
        icon: "rain",
    };

    render(<ForeCastCard day={mockWeatherData} />);

    await screen.findByText('Wednesday');
    expect(require('../../utils/utils').importSVG).toHaveBeenCalledWith('rain');

    expect(screen.getByText("Wednesday")).toBeInTheDocument(); 
    expect(screen.getByText("23°/21°")).toBeInTheDocument();
    expect(screen.getByTestId("forecast-card")).toBeInTheDocument();
  });
});