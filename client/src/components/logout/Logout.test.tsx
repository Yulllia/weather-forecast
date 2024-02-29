import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Logout from "./Logout";
import AuthGoogle from "../pages/auth/AuthGoogle";

describe("CourseList", () => {
  test("renders Logout component", () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Logout />
        </BrowserRouter>
      </RecoilRoot>
    );

    // Check if the Logout link is rendered
    const logoutLink = screen.getByText("Logout");
    expect(logoutLink).toBeInTheDocument();
  });
  test("navigates to main page on Logout", () => {
    const { container } = render(
        <RecoilRoot>
          <MemoryRouter initialEntries={[`/trips`]}>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthGoogle/>
                }
              />
              <Route path="/trips" element={<Logout />} />
            </Routes>
          </MemoryRouter>
        </RecoilRoot>
      );

    // Trigger the logout by clicking on the "Logout" link
    fireEvent.click(screen.getByText("Logout"));

    // Check if the route has changed to "/"
    expect(container).toHaveTextContent("Log In With Google");
  });
});
