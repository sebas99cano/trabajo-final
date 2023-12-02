import { AuthContext, ThemeContext } from "@/core/context";
import { useContext, useEffect, useState } from "react";

const useProfile = () => {
  const [themeState] = useContext(ThemeContext);
  const [authContext] = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserInformation();
  }, []);

  const getUserInformation = () => {
    console.log("themeState", themeState);
    console.log("authContext", authContext);
    setUserData({
      name: "",
      language: "",
      photoURL: "",
    });
  };

  return { userData };
};

export default useProfile;
