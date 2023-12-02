import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase/Config";

const UsersService = {
  getAllUsers: async () => {
    const docRef = collection(fireStore, "user");
    const response = await getDocs(docRef);
    return response;
  },
};

export default UsersService;
