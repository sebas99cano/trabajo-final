import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthProvider, ThemeProvider } from "core/context";
import { BrowserRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "api/firebase/Config";
import LogIn from "pages/signIn/components/LogIn";

import "../../../matchMedia.mock";

const setup = () => {
  return render(
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <LogIn />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

describe("<Login />", () => {
  it("render", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText("Hola, amigo")).toBeInTheDocument();
    });
  });
  it("signIn with email and password", async () => {
    setup();
    const emailInput = screen.getByTestId("signInEmail");
    const passwordInput = screen.getByTestId("signInPassword");
    const signInButton = screen.getByTestId("signInButton");

    fireEvent.change(emailInput, { target: { value: "desarrollo@dev.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(getAuth(app).currentUser).not.toBeNull();
    });
  });
});
