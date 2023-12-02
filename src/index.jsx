import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, ThemeProvider, TasksProvider } from "./core/context";
import App from "./components/app/App";
import "antd/dist/antd.min.css";
import "@/assets/index.scss";

const ApplicationProviders = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <TasksProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </TasksProvider>
    </ThemeProvider>
  </AuthProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApplicationProviders>
    <App />
  </ApplicationProviders>
);
