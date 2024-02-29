import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AuthGoogle from "./AuthGoogle";

global.matchMedia =
  global.matchMedia ||
  function() {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("CourseList", () => {
    let windowOpenSpy: jest.SpyInstance<Window | null, [url?: string | URL | undefined, target?: string | undefined, features?: string | undefined]>;

    beforeEach(() => {
      // Spy on the window.open method
      windowOpenSpy = jest.spyOn(window, "open");
    });
  
    afterEach(() => {
      // Restore the original window.open method
      windowOpenSpy.mockRestore();
    });

  test("renders a list of trips", async () => {
    window.open = jest.fn();
    
    render(
      <RecoilRoot>
        <MemoryRouter initialEntries={[`/`]}>
          <Routes>
            <Route path="/" element={<AuthGoogle />} />
          </Routes>
        </MemoryRouter>
      </RecoilRoot>
    );
    const loginButton = screen.getByText('Log In With Google');
    const url = process.env.REACT_APP_GOOGLE_REDIRECT

    fireEvent.click(loginButton);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining(url!),
      '_self'
    );
  });
});
