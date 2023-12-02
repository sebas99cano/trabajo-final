import React, { useState } from "react";
import { Drawer, Col, Menu, Button, PageHeader } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import "./navBar.scss";
import { useLocation } from "react-router-dom";

const NavBar = ({ items }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <PageHeader
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
        ghost={false}
        className="headerClass"
        title={"EL FRONT D3V"}
        extra={[
          <Col xs={2} sm={2} md={2} lg={0} xl={0} key={"button"}>
            <Button
              type="primary"
              shape="circle"
              icon={<MenuOutlined />}
              onClick={() => setVisible(true)}
            />
          </Col>,
        ]}
      />
      <Drawer
        className="drawerClass"
        width={"240px"}
        placement={"left"}
        closeIcon={false}
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={["home", "counts", "profile"]}
          selectedKeys={[location.pathname]}
          items={items}
          onClick={(item) => {
            if (item && item.key) {
              setVisible(false);
            }
          }}
        />
      </Drawer>
    </>
  );
};
export default NavBar;
