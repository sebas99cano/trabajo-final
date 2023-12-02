import { useContext, useEffect, useState } from "react";

import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { message, Space, Tag, Tooltip } from "antd";

import { v4 as uuid } from "uuid";
import ExpenseClass from "@/core/class/ExpenseClass";
import { AuthContext, ThemeContext } from "@/core/context";
import ExpensesService from "@/api/counts/ExpensesService";
import { PeriodicityValue } from "@/helpers/utils/constants/constants";
import { numThousand } from "@/helpers/utils/validateFormat";
import ModalAlertMessage from "@/components/modalAlertMessage/ModalAlertMessage";

const useExpenses = () => {
  const [authState] = useContext(AuthContext);
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [graphicsData, setGraphicsData] = useState({
    totalExpenses: 0,
    totalExpensesValue: 0,
    maxExpense: 0,
    minExpense: 0,
  });
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    state: false,
    visualize: false,
  });
  const [expenseToEdit, setExpenseToEdit] = useState({
    ...new ExpenseClass(null).state,
  });
  let expenseId = uuid();

  useEffect(() => {
    if (authState?.uid) {
      getAllExpenses();
    }
  }, [authState?.uid]);

  const getAllExpenses = () => {
    setLoading(true);
    ExpensesService.getAllExpensesByUid(authState.uid)
      .then((response) => {
        const responseData = [];
        response.forEach((doc) => {
          responseData.push(doc.data());
        });
        getGraphicsData(responseData);
        setExpensesList(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getGraphicsData = (expensesResponse) => {
    const count = expensesResponse.length;
    let total = 0;
    let max = 0;
    let min = expensesResponse.length > 0 ? expensesResponse[0].monthValue : 0;
    expensesResponse?.forEach((expense) => {
      total = parseFloat(+total + +expense.monthValue);
      if (parseFloat(expense.monthValue) > max) {
        max = expense.monthValue;
      }
      if (parseFloat(expense.monthValue) < min) {
        min = expense.monthValue;
      }
    });
    setGraphicsData({
      totalExpenses: count,
      totalExpensesValue: total,
      maxExpense: max,
      minExpense: min,
    });
  };

  const handleCancel = () => {
    expenseId = uuid();
    setModalVisible({ state: false, visualize: false });
    setExpenseToEdit({ ...new ExpenseClass(null).state });
  };

  const handleOpenModal = () => {
    setModalVisible({ state: true, visualize: false });
    setExpenseToEdit({ ...new ExpenseClass(null).state });
  };

  const handleCreate = (values, oldValues) => {
    setLoadingModal(true);
    const auxPayload = createPayload(values);
    let payload;
    if (oldValues && oldValues.id) {
      payload = new ExpenseClass({ ...oldValues, ...auxPayload }).state;
    } else {
      payload = new ExpenseClass({
        ...auxPayload,
        id: expenseId,
        uid: authState.uid,
      }).state;
    }

    ExpensesService.insertExpense(payload)
      .then((response) => {
        if (response && response.id) {
          handleCancel();
          getAllExpenses();

          message.success(
            oldValues
              ? generalDictionary.ENDPOINT_UPDATE_OK
              : generalDictionary.ENDPOINT_INSERT_OK,
            0.5
          );
        } else {
          message.warning(generalDictionary.ENDPOINT_WARNING, 0.5);
        }
        setLoadingModal(false);
      })
      .catch((error) => {
        setLoadingModal(false);
        console.error("error:", error);
        message.error(generalDictionary.ENDPOINT_ERROR, 0.5);
      });
  };

  const createPayload = (values) => {
    const periodicity = values.periodicity;
    const valuePerDay = parseFloat(
      values.value / PeriodicityValue[periodicity]
    );
    return {
      name: values.name,
      periodicity: periodicity,
      periodicityValue: PeriodicityValue[periodicity],
      value: values.value,
      dayValue: valuePerDay.toFixed(0),
      monthValue: (valuePerDay * PeriodicityValue.monthValue).toFixed(0),
      yearValue: (valuePerDay * PeriodicityValue.yearValue).toFixed(0),
    };
  };

  const deleteExpenseHandle = (id) => {
    ExpensesService.deleteExpense(id)
      .then((response) => {
        if (response) {
          message.success(generalDictionary.ENDPOINT_DELETE, 0.5);
          getAllExpenses();
        } else {
          message.warning(generalDictionary.ENDPOINT_WARNING, 0.5);
        }
      })
      .catch((error) => {
        message.error(generalDictionary.ENDPOINT_ERROR, 0.5);
        console.error(error);
      });
  };

  const columns = [
    {
      title: generalDictionary.NAME,
      dataIndex: "name",
      key: "name",
      align: "center",
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false,
    },
    {
      title: generalDictionary.PERIODICITY,
      dataIndex: "periodicity",
      key: "periodicity",
      align: "center",
      ellipsis: true,
      responsive: ["sm"],
      render: (periodicity) => {
        let periodicityValue;
        switch (periodicity) {
          case "dayValue":
            periodicityValue = generalDictionary.DAILY;
            break;
          case "monthValue":
            periodicityValue = generalDictionary.MONTHLY;
            break;
          case "yearValue":
            periodicityValue = generalDictionary.ANNUAL;
            break;
          default:
            periodicityValue = periodicity;
            break;
        }
        return <span>{periodicityValue}</span>;
      },
      onFilter: (value, record) => record.periodicity.indexOf(value) === 0,
      filters: [
        {
          text: generalDictionary.DAILY,
          value: "dayValue",
        },
        {
          text: generalDictionary.MONTHLY,
          value: "monthValue",
        },
        {
          text: generalDictionary.ANNUAL,
          value: "yearValue",
        },
      ],
    },
    {
      title: generalDictionary.VALUE,
      dataIndex: "value",
      key: "value",
      align: "center",
      ellipsis: true,
      render: (value) => <span>{" $ " + numThousand(value)}</span>,
      sorter: (a, b) => a.value - b.value,
      showSorterTooltip: false,
      responsive: ["sm"],
    },
    {
      title: generalDictionary.MONTH_VALUE,
      dataIndex: "monthValue",
      key: "monthValue",
      align: "center",
      ellipsis: true,
      render: (monthValue) => <span>{" $ " + numThousand(monthValue)}</span>,
      sorter: (a, b) => a.monthValue - b.monthValue,
      showSorterTooltip: false,
      responsive: ["md"],
    },
    {
      title: generalDictionary.DAY_VALUE,
      dataIndex: "dayValue",
      key: "dayValue",
      align: "center",
      ellipsis: true,
      render: (dayValue) => <span>{" $ " + numThousand(dayValue)}</span>,
      sorter: (a, b) => a.dayValue - b.dayValue,
      showSorterTooltip: false,
      responsive: ["lg"],
    },
    {
      title: generalDictionary.YEAR_VALUE,
      dataIndex: "yearValue",
      key: "yearValue",
      align: "center",
      ellipsis: true,
      render: (yearValue) => <span>{" $ " + numThousand(yearValue)}</span>,
      sorter: (a, b) => a.yearValue - b.yearValue,
      showSorterTooltip: false,
      responsive: ["lg"],
    },
    {
      title: generalDictionary.ACTIONS,
      key: "action",
      width: "10%",
      align: "center",
      ellipsis: true,
      render: (expense) => {
        const { ModalAlertMessageFunction } = ModalAlertMessage({
          okText: generalDictionary.DELETE,
          title: generalDictionary.DELETE,
          description: generalDictionary.SURE_DELETE_EXPENSE,
          okParams: expense.id,
          okHandle: deleteExpenseHandle,
        });
        return (
          <Space size="small">
            <Tooltip title={generalDictionary.SEE_DETAIL}>
              <Tag color={"blue"}>
                <InfoCircleTwoTone
                  onClick={() => {
                    setExpenseToEdit({ ...new ExpenseClass(expense).state });
                    setModalVisible({ state: true, visualize: true });
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={generalDictionary.EDIT}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setExpenseToEdit({ ...new ExpenseClass(expense).state });
                    setModalVisible({ state: true, visualize: false });
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={generalDictionary.DELETE}>
              <Tag color={"red"}>
                <DeleteOutlined onClick={ModalAlertMessageFunction} />
              </Tag>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return {
    generalDictionary,
    loading,
    expensesList,
    columns,
    graphicsData,
    modal: {
      modalVisible,
      expenseToEdit,
      loadingModal,
      handleCancel,
      handleCreate,
      handleOpenModal,
    },
  };
};

export default useExpenses;
