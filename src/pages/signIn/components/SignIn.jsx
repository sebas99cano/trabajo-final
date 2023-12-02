import useSignIn from "../hooks/useSignIn";
import { Typography, Button, Row, Col, Form, Input, Spin, Image } from "antd";
import {
  GoogleCircleFilled,
  FacebookFilled,
  GithubFilled,
} from "@ant-design/icons";
import "./signIn.scss";

const { Title } = Typography;

const SignIn = () => {
  const {
    emailRules,
    passwordRules,
    isLoading,
    generalDictionary,
    signInHandler,
    signInGoogle,
    sigInFacebook,
    sigInGitHub,
  } = useSignIn();

  return (
    <div style={{ textAlign: "-webkit-center" }}>
      <Spin tip={generalDictionary.SIGN_IN} spinning={isLoading} size="large">
        <Row className="sigInContainer">
          <Col xs={24} sm={24} md={14} lg={12} xl={12} xxl={12}>
            <Form
              className="formContainer"
              onFinish={(values) => signInHandler(values)}
            >
              <Title>{generalDictionary.WELCOME_BACK}</Title>
              <Form.Item name={"email"} rules={emailRules} hasFeedback>
                <Input
                  size="large"
                  type={"email"}
                  placeholder={generalDictionary.EMAIL}
                />
              </Form.Item>
              <Form.Item name={"password"} rules={passwordRules} hasFeedback>
                <Input.Password
                  size="large"
                  placeholder={generalDictionary.PASSWORD}
                />
              </Form.Item>
              <Form.Item>
                <Button size="large" type={"primary"} htmlType={"submit"} block>
                  {generalDictionary.SIGN_IN}
                </Button>
              </Form.Item>
              <GoogleCircleFilled
                className="iconButton google"
                onClick={signInGoogle}
                key="google"
              />
              <FacebookFilled
                className="iconButton facebook"
                onClick={sigInFacebook}
                key="facebook"
              />
              <GithubFilled
                className="iconButton git"
                onClick={sigInGitHub}
                key="gitHub"
              />
            </Form>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={10}
            lg={12}
            xl={12}
            xxl={12}
            className="imagenContainer"
          >
            <Image
              preview={false}
              alt="Login"
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default SignIn;
