import { Col, Row } from "antd";
import HeaderSection from "@/components/headerSection/HeaderSection";
import LineGraphic from "@/components/lineGraphic/LineGraphic";
import { GraphColor } from "@/helpers/utils/constants/constants";
import React from "react";
import useDashboard from "../hooks/useDashboard";
import DoughnutGraphic from "@/components/doughnutGraphic/DoughnutGraphic";

const Dashboard = () => {
  const { generalDictionary, earnings, expenses, loans } = useDashboard();
  return (
    <>
      <HeaderSection title={generalDictionary.DASHBOARD} />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <LineGraphic
            title={generalDictionary.EARNINGS}
            tooltip={generalDictionary.EARNINGS_TEXT}
            color={GraphColor.green}
            labels={earnings.name}
            values={earnings.value}
            loading={earnings.loading}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <DoughnutGraphic
            title={generalDictionary.COMPARATIVE}
            tooltip={generalDictionary.COMPARATIVE_TEXT}
            labels={[
              generalDictionary.EARNINGS,
              generalDictionary.EXPENSES,
              generalDictionary.LOANS,
            ]}
            values={[earnings.total, expenses.total, loans.total]}
            loading={earnings.loading}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <LineGraphic
            tooltip={generalDictionary.EXPENSES_TEXT}
            title={generalDictionary.EXPENSES}
            color={GraphColor.red}
            labels={expenses.name}
            values={expenses.value}
            loading={expenses.loading}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <LineGraphic
            tooltip={generalDictionary.LOANS_TEXT}
            title={generalDictionary.LOANS}
            color={GraphColor.purple}
            labels={loans.name}
            values={loans.value}
            loading={loans.loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
