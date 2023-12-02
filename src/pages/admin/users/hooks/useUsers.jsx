import { useEffect, useContext, useState } from "react";
import UsersService from "@/api/users/UsersService";
import { AuthContext, ThemeContext } from "@/core/context";
import { Tag } from "antd";

const useUsers = () => {
  const [authState] = useContext(AuthContext);
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authState?.uid) {
      getAllUsers();
    }
  }, []);

  const getAllUsers = () => {
    setLoading(true);
    UsersService.getAllUsers()
      .then((response) => {
        const responseData = [];
        response?.forEach((doc) => {
          responseData.push(doc.data());
        });
        setUserList(responseData);
        console.log(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const columns = [
    {
      title: generalDictionary.NAME,
      dataIndex: "name",
      key: "name",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: generalDictionary.EMAIL,
      dataIndex: "email",
      key: "email",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: generalDictionary.ROL,
      dataIndex: "rol",
      key: "rol",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: generalDictionary.PROVIDER,
      dataIndex: "providerId",
      key: "providerId",
      elipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
      render: (providerId) => {
        return <Tag color={"red"}>{providerId}</Tag>;
      },
    },
  ];

  return { generalDictionary, columns, userList, loading };
};

export default useUsers;
