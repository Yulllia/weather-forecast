import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import { RecoilRoot } from "recoil";

jest.mock("axios");

global.matchMedia =
  global.matchMedia ||
  function() {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("Search Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("handles search correctly", async () => {
    const mockHandleSearch = jest.fn();
    render(
      <RecoilRoot>
        <Search handleSearch={mockHandleSearch} />
      </RecoilRoot>
    );

    await screen.findByTestId("search");

    fireEvent.change(screen.getByTestId("search"), {
      target: { value: "Kyiv" },
    });
    expect(screen.getByTestId("search")).toHaveValue("Kyiv");
    fireEvent.click(screen.getByTestId("search-icon"))
    expect(mockHandleSearch).toHaveBeenCalled();
  });
});
