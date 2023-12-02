import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthProvider, ThemeProvider } from "core/context";
import { BrowserRouter } from "react-router-dom";
import Home from "pages/home/home/components/Home";

import "../../../../matchMedia.mock";

const setup = () => {
  return render(
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

describe("<Home />", () => {
  it("render", async () => {
    setup();
    await waitFor(() => {
      expect(
        screen.getByText(
          `Controla tus finanzas de manera inteligente y sencilla con nuestra aplicación diseñada para ayudarte a administrar tus ingresos, gastos, préstamos y metas financieras. Con "el front d3v", tomar el control de tu dinero nunca ha sido tan fácil.`
        )
      ).toBeInTheDocument();
    });
  });
});
