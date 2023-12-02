import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import HeaderSection from "@/components/headerSection/HeaderSection";
import useEarnings from "../hooks/useEarnings";
import EarningsCards from "./EarningsCards";
import CreateEarning from "./CreateEarning";
import "./earnings.scss";
import DataTable from "@/components/dataTable/DataTable";

const Earnings = () => {
  const {
    generalDictionary,
    loading,
    earningsList,
    columns,
    graphicsData,
    modal,
  } = useEarnings();

  return (
    <>
      <HeaderSection
        title={generalDictionary.EARNINGS}
        buttons={[
          <Button
            key="1"
            type="primary"
            icon={<PlusOutlined />}
            onClick={modal.handleOpenModal}
          >
            {generalDictionary.ADD}
          </Button>,
        ]}
      />

      <EarningsCards
        generalDictionary={generalDictionary}
        graphicsData={graphicsData}
      />

      <DataTable
        id="earnings-table"
        loading={loading}
        dataSource={earningsList}
        columns={columns}
        title={generalDictionary.EARNINGS_LIST}
        color={"success"}
      />

      <CreateEarning
        isVisible={modal.modalVisible}
        expenseToEdit={modal.earningToEdit}
        handleCancel={modal.handleCancel}
        handleCreate={modal.handleCreate}
        loadingModal={modal.loadingModal}
      />
    </>
  );
};

export default Earnings;
