import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import HeaderSection from "@/components/headerSection/HeaderSection";
import useLoans from "../hooks/useLoans";
import LoansCards from "./LoansCards";
import DataTable from "@/components/dataTable/DataTable";
import "./loans.scss";
import CreateLoan from "./CreateLoan";

const Loans = () => {
  const {
    generalDictionary,
    loading,
    loansList,
    columns,
    graphicsData,
    modal,
  } = useLoans();
  return (
    <>
      <HeaderSection
        title={generalDictionary.LOANS}
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

      <LoansCards
        generalDictionary={generalDictionary}
        graphicsData={graphicsData}
      />

      <DataTable
        id="expenses-table"
        loading={loading}
        dataSource={loansList}
        columns={columns}
        title={generalDictionary.LOANS_LIST}
        color={"alternative"}
      />

      <CreateLoan
        generalDictionary={generalDictionary}
        isVisible={modal.modalVisible}
        loanToEdit={modal.loanToEdit}
        handleCancel={modal.handleCancel}
        handleCreate={modal.handleCreate}
        loadingModal={modal.loadingModal}
      />
    </>
  );
};

export default Loans;
