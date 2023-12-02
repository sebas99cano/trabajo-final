import React from "react";
import { Form, Spin } from "antd";
import { FaFacebookF, FaGooglePlusG, FaGithub } from "react-icons/fa";
import useSignIn from "../hooks/useSignIn";
import "./logIn.scss";

const LogIn = () => {
  const {
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
  } = useSignIn();

  return (
    <div className={"center-webkit"}>
      <Spin tip={generalDictionary.SIGN_IN} spinning={isLoading} size="large">
        <div className="login-page">
          <div
            className={
              toggle ? "container-login" : "container-login right-panel-active"
            }
          >
            <div className="sign-up">
              <Form
                onFinish={() => {}}
                initialValues={{ email: "", password: "", name: "" }}
              >
                <h1 className="h1-login login-title">
                  {generalDictionary.SIGN_UP}
                </h1>
                <div className="social-container">
                  <span className="span-login social" onClick={sigInFacebook}>
                    <FaFacebookF size="20px" />
                  </span>
                  <span className="span-login social" onClick={signInGoogle}>
                    <FaGooglePlusG size="20px" />
                  </span>
                  <span className="span-login social" onClick={sigInGitHub}>
                    <FaGithub size="20px" />
                  </span>
                </div>
                <p className="p-login"> {generalDictionary.OR_USE_EMAIL}</p>
                <Form.Item name={"name"} rules={nameRules} hasFeedback>
                  <input
                    className={"input-login"}
                    placeholder={generalDictionary.NAME}
                    id="signUpName"
                    data-testid={"signUpName"}
                  />
                </Form.Item>
                <Form.Item name={"email"} rules={emailRules} hasFeedback>
                  <input
                    className={"input-login"}
                    placeholder={generalDictionary.EMAIL}
                    id="signUpEmail"
                    data-testid={"signUpEmail"}
                  />
                </Form.Item>
                <Form.Item name={"password"} rules={passwordRules} hasFeedback>
                  <input
                    className={"input-login"}
                    type="password"
                    placeholder={generalDictionary.PASSWORD}
                    id="signUpPassword"
                    data-testid={"signUpPassword"}
                  />
                </Form.Item>
                <button
                  className={"button-login"}
                  type="submit"
                  data-testid={"signUpButton"}
                >
                  {generalDictionary.SIGN_UP}
                </button>
                <button
                  className={"button-login"}
                  id="signInMobile"
                  type="button"
                  onClick={() => setToggle(true)}
                >
                  {generalDictionary.SIGN_IN}
                </button>
              </Form>
            </div>
            <div className="sign-in">
              <Form
                onFinish={(values) => signInHandler(values)}
                initialValues={{ email: "", password: "" }}
              >
                <h1 className="h1-login">{generalDictionary.SIGN_IN}</h1>
                <div className="social-container">
                  <span className="span-login social" onClick={sigInFacebook}>
                    <FaFacebookF size="20px" />
                  </span>
                  <span className="span-login social" onClick={signInGoogle}>
                    <FaGooglePlusG size="20px" />
                  </span>
                  <span className="span-login social" onClick={sigInGitHub}>
                    <FaGithub size="20px" />
                  </span>
                </div>
                <p className="p-login">{generalDictionary.USE_YOUR_ACCOUNT}</p>
                <Form.Item name={"email"} rules={emailRules} hasFeedback>
                  <input
                    className={"input-login"}
                    placeholder={generalDictionary.EMAIL}
                    id="signInEmail"
                    data-testid={"signInEmail"}
                  />
                </Form.Item>
                <Form.Item name={"password"} rules={passwordRules} hasFeedback>
                  <input
                    className={"input-login"}
                    type="password"
                    placeholder={generalDictionary.PASSWORD}
                    id="signInPassword"
                    data-testid={"signInPassword"}
                  />
                </Form.Item>

                <a className="a-login" href="/">
                  {generalDictionary.FORGOT_PASSWORD}
                </a>
                <button
                  className={"button-login"}
                  type="submit"
                  data-testid={"signInButton"}
                >
                  {generalDictionary.SIGN_IN}
                </button>
                <button
                  className={"button-login"}
                  id="signUpMobile"
                  type="button"
                  onClick={() => setToggle(false)}
                >
                  {generalDictionary.SIGN_UP}
                </button>
              </Form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-left">
                  <h1 className="h1-login">{generalDictionary.WELCOME_BACK}</h1>
                  <p className="p-login">
                    {generalDictionary.TO_KEEP_CONNECTED}
                  </p>
                  <button
                    className={"button-login"}
                    id="signIn"
                    onClick={() => setToggle(true)}
                  >
                    {generalDictionary.SIGN_IN}
                  </button>
                </div>
                <div className="overlay-right">
                  <h1 className="h1-login">{generalDictionary.HELLO_FRIEND}</h1>
                  <p className="p-login">
                    {generalDictionary.ENTER_YOUR_PERSONAL}
                  </p>
                  <button
                    className={"button-login"}
                    id="signUp"
                    onClick={() => setToggle(false)}
                  >
                    {generalDictionary.SIGN_UP}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default LogIn;
