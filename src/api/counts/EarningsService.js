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

const EarningService = {
  getAllEarningsByUid: async (uid) => {
    const docRef = collection(fireStore, "earnings");
    const consult = query(
      docRef,
      where("uid", "==", uid),
      orderBy("periodicityValue", "desc")
    );
    const response = getDocs(consult);
    return response;
  },
  insertEarning: async (earning) => {
    const docRef = doc(fireStore, `earnings/${earning.id}`);
    await setDoc(docRef, earning);
    const consult = await getDoc(docRef);
    return consult.data();
  },
  deleteEarning: async (id) => {
    const docRef = doc(fireStore, `earnings/${id}`);
    await deleteDoc(docRef);
    return true;
  },
};

export default EarningService;
