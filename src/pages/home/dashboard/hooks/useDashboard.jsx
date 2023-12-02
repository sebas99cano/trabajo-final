import { useContext, useEffect, useState } from "react";
import { AuthContext, ThemeContext } from "@/core/context";
import EarningService from "@/api/counts/EarningsService";
import ExpensesService from "@/api/counts/ExpensesService";
import LoansService from "@/api/counts/LoansService";

const useDashboard = () => {
  const [authState] = useContext(AuthContext);
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const [earnings, setEarnings] = useState({
    name: [],
    value: [],
    loading: false,
    total: 0,
  });

  const [expenses, setExpenses] = useState({
    name: [],
    value: [],
    loading: false,
    total: 0,
  });

  const [loans, setLoans] = useState({
    name: [],
    value: [],
    loading: false,
    total: 0,
  });

  useEffect(() => {
    if (authState?.uid) {
      getAllEarnings();
      getAllExpenses();
      getAllLoans();
    }
  }, [authState?.uid]);

  const getAllEarnings = () => {
    setEarnings({ ...earnings, loading: true });
    EarningService.getAllEarningsByUid(authState.uid)
      .then((response) => {
        const responseData = [];
        response?.forEach((doc) => {
          responseData.push(doc.data());
        });
        setEarnings({
          name: responseData.map((element) => element.name),
          value: responseData.map((element) => element.monthValue),
          loading: false,
          total: responseData.reduce(
            (acumulador, element) => acumulador + parseInt(element.monthValue),
            0
          ),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllExpenses = () => {
    setExpenses({ ...expenses, loading: true });
    ExpensesService.getAllExpensesByUid(authState.uid)
      .then((response) => {
        const responseData = [];
        response.forEach((doc) => {
          responseData.push(doc.data());
        });
        setExpenses({
          name: responseData.map((element) => element.name),
          value: responseData.map((element) => element.monthValue),
          loading: false,
          total: responseData.reduce(
            (acumulador, element) => acumulador + parseInt(element.monthValue),
            0
          ),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllLoans = () => {
    setLoans({ ...loans, loading: true });
    LoansService.getAllLoansByUid(authState.uid)
      .then((response) => {
        const responseData = [];
        response.forEach((doc) => {
          responseData.push(doc.data());
        });
        setLoans({
          name: responseData.map((element) => element.name),
          value: responseData.map((element) => element.value),
          loading: false,
          total: responseData.reduce(
            (acumulador, element) => acumulador + element.value,
            0
          ),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    generalDictionary,
    earnings,
    expenses,
    loans,
  };
};

export default useDashboard;
