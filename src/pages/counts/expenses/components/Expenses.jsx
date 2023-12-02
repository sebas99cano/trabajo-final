import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DataTable from "@/components/dataTable/DataTable";
import HeaderSection from "@/components/headerSection/HeaderSection";
import useExpenses from "../hooks/useExpenses";
import ExpensesCards from "./ExpensesCards";
import CreateExpense from "./CreateExpense";
import "./expenses.scss";

const Expenses = () => {
  const {
    generalDictionary,
    loading,
    expensesList,
    columns,
    graphicsData,
    modal,
  } = useExpenses();
  return (
    <>
      <HeaderSection
        title={generalDictionary.EXPENSES}
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

      <ExpensesCards
        generalDictionary={generalDictionary}
        graphicsData={graphicsData}
      />

      <DataTable
        id="expenses-table"
        loading={loading}
        dataSource={expensesList}
        columns={columns}
        title={generalDictionary.EXPENSES_LIST}
        color={"error"}
      />

      <CreateExpense
        isVisible={modal.modalVisible}
        expenseToEdit={modal.expenseToEdit}
        handleCancel={modal.handleCancel}
        handleCreate={modal.handleCreate}
        loadingModal={modal.loadingModal}
      />
    </>
  );
};

export default Expenses;
