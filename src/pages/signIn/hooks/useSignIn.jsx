import { useContext, useState } from "react";

import {
  facebookSigIinFirebase,
  gitHubSignInFirebase,
  googleSignInFirebase,
  signInFirebase,
} from "@/api/firebase/Auth";

import { message } from "antd";
import { AuthContext, ThemeContext } from "@/core/context";
import UserClass from "@/core/class/UserClass";
import AuthService from "@/api/AuthService";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [, authDispatch] = useContext(AuthContext);
  const [themeState, themeDispatch] = useContext(ThemeContext);

  const { generalDictionary } = themeState;

  const getUserDetail = (credential, providerId) => {
    const userPayload = new UserClass(credential, credential.uid, providerId);
    AuthService.getUserDetail(userPayload.state)
      .then((user) => {
        message.success(
          `Bienvenido ${user.rol} ${user.name ? user.name : user.email}`,
          0.5
        );
        sessionStorage.setItem(
          "storage",
          JSON.stringify({
            email: user.email,
            uid: user.uid,
            token: user.accessToken,
          })
        );
        authDispatch({
          type: "LOGIN_USER",
          payload: user,
        });
        themeDispatch({
          type: user.themePreference,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        validateErrorMessage(error.message);
        setIsLoading(false);
        console.error("error", error);
      });
  };

  const signInHandler = (values) => {
    sessionStorage.removeItem("storage");
    setIsLoading(true);
    signInFirebase(values.email, values.password)
      .then((response) => {
        getUserDetail(response.user, "Email");
      })
      .catch((error) => {
        validateErrorMessage(error.message);
        console.error(error.message);
        setIsLoading(false);
      });
  };

  const signInGoogle = () => {
    setIsLoading(true);
    googleSignInFirebase()
      .then((response) => {
        getUserDetail(response.user, response.providerId);
      })
      .catch((error) => {
        validateErrorMessage(error.message);
        console.error(error.message);
        setIsLoading(false);
      });
  };

  const sigInFacebook = () => {
    setIsLoading(true);
    facebookSigIinFirebase()
      .then((response) => {
        getUserDetail(response.user, response.providerId);
      })
      .catch((error) => {
        validateErrorMessage(error.message);
        console.error(error.message);
        setIsLoading(false);
      });
  };

  const sigInGitHub = () => {
    setIsLoading(true);
    gitHubSignInFirebase()
      .then((response) => {
        getUserDetail(response.user, response.providerId);
      })
      .catch((error) => {
        validateErrorMessage(error.message);
        console.error(error.message);
        setIsLoading(false);
      });
  };

  const validateErrorMessage = (error) => {
    if (error === "Firebase: Error (auth/email-already-in-use).") {
      message.error(generalDictionary.EMAIL_NOT_AVAILABLE, 0.5);
    } else if (
      error ===
      "Firebase: Error (auth/account-exists-with-different-credential)."
    ) {
      message.error(
        generalDictionary.EMAIL_REGISTER_WITH_DIFFERENT_METHOD,
        0.5
      );
    } else if (error === "Firebase: Error (auth/popup-closed-by-user).") {
      message.error(generalDictionary.CLOSED_POPUP, 0.5);
    } else if (error.message === "Firebase: Error (auth/user-not-found).") {
      message.error(generalDictionary.USER_OR_PASSWORD_INCORRECT, 0.5);
    } else if (error.message === "Firebase: Error (auth/wrong-password).") {
      message.error(generalDictionary.PASSWORD_INCORRECT, 0.5);
    } else {
      message.error(generalDictionary.LOGIN_ERROR, 0.5);
    }
  };

  const emailRules = [
    {
      required: true,
      min: 8,
      type: "email",
      message: generalDictionary.VALIDATE_EMAIL,
    },
  ];
  const passwordRules = [
    {
      required: true,
      min: 5,
      type: "password",
      message: generalDictionary.VALIDATE_PASSWORD,
    },
  ];

  const nameRules = [
    {
      required: true,
      min: 3,
      message: generalDictionary.VALIDATE_NAME,
    },
  ];

  return {
    emailRules,
    passwordRules,
    nameRules,
    isLoading,
    generalDictionary,
    toggle,
    setToggle,
    signInHandler,
    signInGoogle,
    sigInFacebook,
    sigInGitHub,
  };
};

export default useSignIn;
