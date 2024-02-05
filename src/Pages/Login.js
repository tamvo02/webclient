import { useState } from "react";
import { Form, Input, Button, message, Checkbox, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    navigate("/Home");

    // Simulating an API call to authenticate user
    // try {
    //   const response = await handleApi.post("/api-web/login", {
    //     key: values.key,
    //   });

    //   if (response.data.status == "Success") {
    //     // Store the token in localStorage
    //     localStorage.setItem("token", response.data.data);
    //     message.success("Login successful : " + response.data.data); navigate("/home");
    //   } else {
    //     message.error("Login fail");
    //   }
    // } catch (error) {
    //   message.error("Login failed. Please check your credentials.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f1ed",
          boxShadow: "0px 0px 10px #3399FF",
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 10,
          width: 400,
          paddingLeft: 50,
          paddingRight: 50,
        }}
      >
        <Image src={require("../assets/logo.png")}></Image>
        {/* <h1>Login</h1> */}
        <Form
          // labelCol={{
          //   span: 1,
          // }}
          // wrapperCol={{
          //   span: 10,
          // }}
          layout="horizontal"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            paddingTop: 40,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 10,
            width: 400,
            paddingLeft: 50,
            paddingRight: 50,
          }}
          name="loginForm"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
            style={{ width: "100%" }}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <div>
                Or <a href="/">register now!</a>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
