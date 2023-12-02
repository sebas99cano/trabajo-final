import React from "react";
import { Col, Row } from "antd";
import {
  ContainerOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import GraphicsCard from "@/components/graphicsCard/GraphicsCard";
import { numThousand } from "@/helpers/utils/validateFormat";

const LoansCards = ({ graphicsData, generalDictionary }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"dark"}
            icon={<ContainerOutlined />}
            title={generalDictionary.NUMBER_OF_LOANS}
            data={graphicsData?.totalLoans}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"alternative"}
            icon={<BarChartOutlined />}
            title={generalDictionary.TOTAL_VALUE}
            data={" $ " + numThousand(graphicsData?.totalValue)}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"success"}
            icon={<PieChartOutlined />}
            title={generalDictionary.TOTAL_INTERESTS}
            data={" $ " + numThousand(graphicsData?.totalInterests)}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"primary"}
            icon={<LineChartOutlined />}
            title={generalDictionary.MAX_INTERESTS}
            data={" $ " + numThousand(graphicsData?.maxInterests)}
          />
        </Col>
      </Row>
    </>
  );
};

export default LoansCards;
