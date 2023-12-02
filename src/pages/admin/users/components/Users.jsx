import React from "react";
import useUsers from "../hooks/useUsers";

import DataTable from "@/components/dataTable/DataTable";
import HeaderSection from "@/components/headerSection/HeaderSection";

const Users = () => {
  const { generalDictionary, columns, userList, loading } = useUsers();

  return (
    <>
      <HeaderSection title={generalDictionary.USERS} />
      <DataTable
        id="users-table"
        loading={loading}
        dataSource={userList}
        columns={columns}
        title={generalDictionary.USER_LIST}
        color={"success"}
        rowKey={"uid"}
      />
    </>
  );
};

export default Users;
