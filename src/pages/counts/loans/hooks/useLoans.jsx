import { useContext, useEffect, useState } from "react";
import { message, Space, Tag, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import LoansService from "@/api/counts/LoansService";
import { v4 as uuid } from "uuid";
import { AuthContext, ThemeContext } from "@/core/context";
import LoanClass from "@/core/class/LoanClass";
import ModalAlertMessage from "@/components/modalAlertMessage/ModalAlertMessage";
import { numThousand } from "@/helpers/utils/validateFormat";

const useLoans = () => {
  const [authState] = useContext(AuthContext);
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const [loansList, setLoansList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [graphicsData, setGraphicsData] = useState({
    totalLoans: 0,
    totalValue: 0,
    totalInterests: 0,
    maxInterests: 0,
  });
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    state: false,
    visualize: false,
  });
  const [loanToEdit, setLoanToEdit] = useState({
    ...new LoanClass(null).state,
  });
  let loanId = uuid();

  useEffect(() => {
    if (authState?.uid) {
      getAllLoans();
    }
  }, [authState?.uid]);

  const getAllLoans = () => {
    setLoading(true);
    LoansService.getAllLoansByUid(authState.uid)
      .then((response) => {
        const responseData = [];
        response.forEach((doc) => {
          responseData.push(doc.data());
        });
        getGraphicsData(responseData);
        setLoansList(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getGraphicsData = (responseData) => {
    const count = responseData.length;
    let totalValue = 0;
    let totalInterests = 0;
    let maxInterests = 0;

    responseData.forEach((loan) => {
      totalValue = parseFloat(+totalValue + +loan.value);
      totalInterests = parseFloat(+totalInterests + +loan.interests);
      if (parseFloat(loan.interests) > maxInterests) {
        maxInterests = loan.interests;
      }
    });

    setGraphicsData({
      totalLoans: count,
      totalValue: totalValue,
      totalInterests: totalInterests,
      maxInterests: maxInterests,
    });
  };

  const handleCancel = () => {
    loanId = uuid();
    setModalVisible({ state: false, visualize: false });
    setLoanToEdit({ ...new LoanClass(null).state });
  };

  const handleOpenModal = () => {
    setModalVisible({ state: true, visualize: false });
    setLoanToEdit({ ...new LoanClass(null).state });
  };

  const handleCreate = (values, oldValues) => {
    setLoadingModal(true);
    let payload;
    if (oldValues && oldValues.id) {
      payload = new LoanClass({ ...oldValues, ...values }).state;
    } else {
      payload = new LoanClass({
        ...values,
        id: loanId,
        uid: authState.uid,
      }).state;
    }

    LoansService.insertLoan(payload)
      .then((response) => {
        if (response && response.id) {
          handleCancel();
          getAllLoans();

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

  const deleteLoanHandle = (id) => {
    LoansService.deleteLoan(id)
      .then((response) => {
        if (response) {
          message.success(generalDictionary.ENDPOINT_DELETE, 0.5);
          getAllLoans();
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
      title: generalDictionary.DATE,
      dataIndex: "initialDate",
      key: "initialDate",
      align: "center",
      ellipsis: true,
      responsive: ["sm"],
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
          case "none":
            periodicityValue = generalDictionary.NONE;
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
        {
          text: generalDictionary.NONE,
          value: "none",
        },
      ],
    },
    {
      title: generalDictionary.DESCRIPTION,
      dataIndex: "description",
      key: "description",
      align: "center",
      ellipsis: true,
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
    },
    {
      title: generalDictionary.INTERESTS,
      dataIndex: "interests",
      key: "interests",
      align: "center",
      ellipsis: true,
      render: (interests) => <span>{" $ " + numThousand(interests)}</span>,
      sorter: (a, b) => a.interests - b.interests,
      showSorterTooltip: false,
    },
    {
      title: generalDictionary.ACTIONS,
      key: "action",
      align: "center",
      ellipsis: true,
      render: (loan) => {
        const { ModalAlertMessageFunction } = ModalAlertMessage({
          okText: generalDictionary.DELETE,
          title: generalDictionary.DELETE,
          description: generalDictionary.SURE_DELETE_LOAN,
          okParams: loan.id,
          okHandle: deleteLoanHandle,
        });
        return (
          <Space size="small">
            <Tooltip title={generalDictionary.SEE_DETAIL}>
              <Tag color={"blue"}>
                <InfoCircleTwoTone
                  onClick={() => {
                    setLoanToEdit({ ...new LoanClass(loan).state });
                    setModalVisible({ state: true, visualize: true });
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={generalDictionary.EDIT}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setLoanToEdit({ ...new LoanClass(loan).state });
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
    loansList,
    columns,
    graphicsData,
    modal: {
      modalVisible,
      loanToEdit,
      loadingModal,
      handleCancel,
      handleCreate,
      handleOpenModal,
    },
  };
};

export default useLoans;
