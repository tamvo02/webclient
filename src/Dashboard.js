// export default Dashboard;
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu, Image } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Phân tích", "1", <DesktopOutlined />, "/Home"),
  // getItem("Product", "2", <PieChartOutlined />, "Page2_Product"),
  // getItem(
  //   "Distribution",
  //   "3",
  //   <ContainerOutlined style={{ color: "#999997" }} />,
  //   "Page3_Distribution"
  // ),
  // getItem("Profile", "4", <AppstoreOutlined />, "Page6_Profiles"),
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "row !important",
      }}
    >
      <div
        style={{
          width: 256,
          height: "100vh",
          background: "#3399FF",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
          <Image src={require("./assets/logo.png")}></Image>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ flex: 1, background: "#3399FF", marginTop: 20 }}
        >
          {/* <div> */}
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => {
                // navigate(item.children);
                // console.log(item);
              }}
            >
              <Link to={item.children}>{item.label}</Link>
            </Menu.Item>
          ))}
          {/* </div> */}
        </Menu>
        <Button
          style={{ width: 50, marginBottom: 20 }}
          onClick={() => navigate("/")}
        >
          <LogoutOutlined />
        </Button>
      </div>
      <div
        style={{
          flex: 1,
          // background: "",
        }}
      >
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Dashboard;
