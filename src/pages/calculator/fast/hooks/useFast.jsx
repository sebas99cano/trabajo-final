import { ThemeContext } from "@/core/context";
import React, { useContext } from "react";

const useFast = () => {
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const initialValues = { percent: 0, value: 0 };
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  const rules = {
    percentRules: [
      {
        required: true,
        type: "number",
        min: 1,
        max: 100,
        message: generalDictionary.VALIDATE_VALUE,
      },
    ],
    valueRules: [
      {
        transform: (value) => parseFloat(value),
        required: true,
        type: "number",
        min: 1,
        max: 5,
        message: generalDictionary.VALIDATE_VALUE,
      },
    ],
  };
  return { initialValues, rules, handleSubmit };
};

export default useFast;
