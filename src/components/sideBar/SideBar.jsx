import React from "react";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import "./sideBar.scss";
const { Sider } = Layout;

const SideBar = ({ items }) => {
  const location = useLocation();
  return (
    <Sider
      theme="light"
      className="sideBarContainer"
      style={{ position: "fixed" }}
    >
      <Menu
        mode="inline"
        defaultOpenKeys={["home", "counts", "profile", "calculator", "admin"]}
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
