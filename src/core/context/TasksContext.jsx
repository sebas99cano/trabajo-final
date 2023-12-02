import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { fireStore } from "@/api/firebase/Config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const TasksContext = createContext({});

const initialState = {
  list: [],
};

const TasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, list: action.payload };
    default:
      return { ...initialState };
  }
};

export const TasksProvider = ({ children }) => {
  const [authState] = useContext(AuthContext);
  const [tasksState, tasksDispatch] = useReducer(TasksReducer, initialState);

  useEffect(() => {
    if (authState?.uid) {
      getAllListListener();
    }
  }, [authState]);

  const getAllListListener = () => {
    const docRef = collection(fireStore, "tasks");
    const consult = query(
      docRef,
      where("uid", "==", authState.uid),
      orderBy("date", "asc")
    );

    onSnapshot(consult, (tasksCollection) => {
      let tasksList = [];
      tasksCollection.docs.forEach((doc) => {
        tasksList.push(doc.data());
      });

      tasksDispatch({
        type: "SET_LIST",
        payload: tasksList,
      });
    });
  };

  return (
    <TasksContext.Provider value={[tasksState, tasksDispatch]}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
