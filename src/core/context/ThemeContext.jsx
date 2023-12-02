import { createContext, useReducer } from "react";

import ES from "../languages/ES";
import EN from "../languages/EN";

export const ThemeContext = createContext({});

const initialState = {
  themeClass: "light",
  language: "ES",
  ...ES,
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK_MODE":
      return { ...state, themeClass: "dark" };
    case "LIGHT_MODE":
      return { ...state, themeClass: "light" };
    case "SWITCH_TO_ENGLISH":
      return { ...state, language: "EN", ...EN };
    case "SWITCH_TO_SPANISH":
      return { ...state, language: "ES", ...ES };
    default:
      return { ...initialState };
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, ThemeDispatch] = useReducer(ThemeReducer, initialState);

  return (
    <ThemeContext.Provider value={[state, ThemeDispatch]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
