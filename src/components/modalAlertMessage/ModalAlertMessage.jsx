import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

const ModalAlertMessage = ({
  okText,
  okParams,
  okHandle,
  cancelText,
  cancelParams,
  cancelHandle,
  title,
  icon,
  description,
}) => {
  const ModalAlertMessageFunction = () => {
    confirm({
      okText: okText ? okText : "Ok",
      cancelText: cancelText ? cancelText : "Cancelar",
      title: title ? title : "",
      icon: icon ? icon : <ExclamationCircleOutlined />,
      content: description ? description : "",
      onOk() {
        if (okHandle) {
          okHandle(okParams ? okParams : null);
        }
      },
      onCancel() {
        if (cancelHandle) {
          cancelHandle(cancelParams ? cancelParams : null);
        }
      },
    });
  };
  return { ModalAlertMessageFunction };
};

export default ModalAlertMessage;
