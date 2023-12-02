import { useContext, useEffect, useState } from "react";
import { message, Space, Tag, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";

import { AuthContext, ThemeContext } from "@/core/context";
import { v4 as uuid } from "uuid";
import EarningClass from "@/core/class/EarningClass";
import EarningService from "@/api/counts/EarningsService";
import { PeriodicityValue } from "@/helpers/utils/constants/constants";
import { numThousand } from "@/helpers/utils/validateFormat";
import ModalAlertMessage from "@/components/modalAlertMessage/ModalAlertMessage";
const useEarnings = () => {
  const [authState] = useContext(AuthContext);
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const [earningsList, setEarningsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [graphicsData, setGraphicsData] = useState({
    totalEarnings: 0,
    totalEarningsValue: 0,
    maxEarning: 0,
    minEarning: 0,
  });

  const [loadingModal, setLoadingModal] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    state: false,
    visualize: false,
  });
  const [earningToEdit, setEarningToEdit] = useState({
    ...new EarningClass(null).state,
  });
  let earningId = uuid();

  useEffect(() => {
    if (authState?.uid) {
      getAllEarnings();
    }
  }, [authState?.uid]);

  const getAllEarnings = () => {
    setLoading(true);
    EarningService.getAllEarningsByUid(authState.uid)
      .then((response) => {
        const responseData = [];
        response?.forEach((doc) => {
          responseData.push(doc.data());
        });
        getGraphicsData(responseData);
        setEarningsList(responseData);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const getGraphicsData = (earningsResponse) => {
    const count = earningsResponse.length;
    let total = 0;
    let max = 0;
    let min = earningsResponse.length > 0 ? earningsResponse[0].monthValue : 0;
    earningsResponse?.forEach((earning) => {
      total = parseFloat(+total + +earning.monthValue);
      if (parseFloat(earning.monthValue) > max) {
        max = earning.monthValue;
      }
      if (parseFloat(earning.monthValue) < min) {
        min = earning.monthValue;
      }
    });
    setGraphicsData({
      totalEarnings: count,
      totalEarningsValue: total,
      maxEarning: max,
      minEarning: min,
    });
  };

  const handleOpenModal = () => {
    setModalVisible({ state: true, visualize: false });
    setEarningToEdit({ ...new EarningClass(null).state });
  };

  const handleCancel = () => {
    earningId = uuid();
    setModalVisible({ state: false, visualize: false });
    setEarningToEdit({ ...new EarningClass(null).state });
  };

  const deleteEarningHandle = (id) => {
    EarningService.deleteEarning(id)
      .then((response) => {
        if (response) {
          message.success(generalDictionary.ENDPOINT_DELETE, 0.5);
          getAllEarnings();
        } else {
          message.warning(generalDictionary.ENDPOINT_WARNING, 0.5);
        }
      })
      .catch((error) => {
        message.error(generalDictionary.ENDPOINT_ERROR, 0.5);
        console.error(error);
      });
  };

  const handleCreate = (values, oldValues) => {
    setLoadingModal(true);
    const auxPayload = createPayload(values);
    let payload;
    if (oldValues && oldValues.id) {
      payload = new EarningClass({ ...oldValues, ...auxPayload }).state;
    } else {
      payload = new EarningClass({
        ...auxPayload,
        id: earningId,
        uid: authState.uid,
      }).state;
    }

    EarningService.insertEarning(payload)
      .then((response) => {
        if (response && response.id) {
          handleCancel();
          getAllEarnings();
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
      title: generalDictionary.PERIODICITY,
      dataIndex: "periodicity",
      key: "periodicity",
      elipsis: true,
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
      elipsis: true,
      render: (value) => <span>{" $ " + numThousand(value)}</span>,
      sorter: (a, b) => a.value - b.value,
      showSorterTooltip: false,
      responsive: ["sm"],
    },
    {
      title: generalDictionary.MONTH_VALUE,
      dataIndex: "monthValue",
      key: "monthValue",
      elipsis: true,
      render: (monthValue) => <span>{" $ " + numThousand(monthValue)}</span>,
      sorter: (a, b) => a.monthValue - b.monthValue,
      showSorterTooltip: false,
      responsive: ["md"],
    },
    {
      title: generalDictionary.DAY_VALUE,
      dataIndex: "dayValue",
      key: "dayValue",
      elipsis: true,
      render: (dayValue) => <span>{" $ " + numThousand(dayValue)}</span>,
      sorter: (a, b) => a.dayValue - b.dayValue,
      showSorterTooltip: false,
      responsive: ["lg"],
    },
    {
      title: generalDictionary.YEAR_VALUE,
      dataIndex: "yearValue",
      key: "yearValue",
      elipsis: true,
      render: (yearValue) => <span>{" $ " + numThousand(yearValue)}</span>,
      sorter: (a, b) => a.yearValue - b.yearValue,
      showSorterTooltip: false,
      responsive: ["lg"],
    },
    {
      title: generalDictionary.ACTIONS,
      key: "action",
      width: "10%",
      elipsis: false,
      render: (earning) => {
        const { ModalAlertMessageFunction } = ModalAlertMessage({
          okText: generalDictionary.DELETE,
          title: generalDictionary.DELETE,
          description: generalDictionary.SURE_DELETE_EARNING,
          okParams: earning.id,
          okHandle: deleteEarningHandle,
        });
        return (
          <Space size="small">
            <Tooltip title={generalDictionary.SEE_DETAIL}>
              <Tag color={"blue"}>
                <InfoCircleTwoTone
                  onClick={() => {
                    setEarningToEdit({ ...new EarningClass(earning).state });
                    setModalVisible({ state: true, visualize: true });
                  }}
                />
              </Tag>
            </Tooltip>
            <Tooltip title={generalDictionary.EDIT}>
              <Tag color={"green"}>
                <EditOutlined
                  onClick={() => {
                    setEarningToEdit({ ...new EarningClass(earning).state });
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
    earningsList,
    columns,
    graphicsData,
    modal: {
      modalVisible,
      earningToEdit,
      loadingModal,
      handleCancel,
      handleCreate,
      handleOpenModal,
    },
  };
};

export default useEarnings;
