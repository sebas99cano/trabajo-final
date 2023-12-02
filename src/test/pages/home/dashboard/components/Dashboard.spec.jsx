import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthProvider, ThemeProvider } from "core/context";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "pages/home/dashboard/components/Dashboard";

import "../../../../matchMedia.mock";

const setup = () => {
  return render(
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

describe("<Home />", () => {
  it("render", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(`Dashboard`)).toBeInTheDocument();
    });
  });
});
