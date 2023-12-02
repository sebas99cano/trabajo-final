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

const ExpensesCards = ({ graphicsData, generalDictionary }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"dark"}
            icon={<ContainerOutlined />}
            title={generalDictionary.NUMBER_OF_EXPENSES}
            data={graphicsData.totalExpenses}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"warning"}
            icon={<BarChartOutlined />}
            title={generalDictionary.TOTAL_EXPENSES}
            data={" $ " + numThousand(graphicsData.totalExpensesValue)}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"error"}
            icon={<PieChartOutlined />}
            title={generalDictionary.MAX_EXPENSE}
            data={" $ " + numThousand(graphicsData.maxExpense)}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
          <GraphicsCard
            color={"primary"}
            icon={<LineChartOutlined />}
            title={generalDictionary.MIN_EXPENSE}
            data={" $ " + numThousand(graphicsData.minExpense)}
          />
        </Col>
      </Row>
    </>
  );
};

export default ExpensesCards;
