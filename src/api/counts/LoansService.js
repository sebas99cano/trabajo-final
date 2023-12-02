import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fireStore } from "../firebase/Config";

const LoansService = {
  getAllLoansByUid: async (uid) => {
    const docRef = collection(fireStore, "loans");
    const consult = query(docRef, where("uid", "==", uid));
    const response = getDocs(consult);
    return response;
  },
  insertLoan: async (loan) => {
    const docRef = doc(fireStore, `loans/${loan.id}`);
    await setDoc(docRef, loan);
    const consult = await getDoc(docRef);
    return consult.data();
  },
  deleteLoan: async (id) => {
    const docRef = doc(fireStore, `loans/${id}`);
    await deleteDoc(docRef);
    return true;
  },
};

export default LoansService;
