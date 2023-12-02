import React from "react";

import { Card, Col, Row, Statistic, Divider } from "antd";
import "./graphicsCard.scss";
const GraphicsCard = ({ color, icon, title, data }) => {
  return (
    <Card className="graphicsCardContainer">
      <Row>
        <Col span={7}>
          <Card className={`iconCardContainer ${color ? color : ""}`}>
            {icon}
          </Card>
        </Col>
        <Col span={17} className="statisticsClass">
          <Statistic title={title} value={data} />
        </Col>
      </Row>
      <Divider className="dividerClass" />
    </Card>
  );
};

export default GraphicsCard;
