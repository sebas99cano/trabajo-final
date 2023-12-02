import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fireStore } from "../firebase/Config";

const ExpensesService = {
  getAllExpensesByUid: async (uid) => {
    const docRef = collection(fireStore, "expenses");
    const consult = query(
      docRef,
      where("uid", "==", uid),
      orderBy("periodicityValue", "desc")
    );
    const response = getDocs(consult);
    return response;
  },
  insertExpense: async (expense) => {
    const docRef = doc(fireStore, `expenses/${expense.id}`);
    await setDoc(docRef, expense);
    const consult = await getDoc(docRef);
    return consult.data();
  },
  deleteExpense: async (id) => {
    const docRef = doc(fireStore, `expenses/${id}`);
    await deleteDoc(docRef);
    return true;
  },
};

export default ExpensesService;
