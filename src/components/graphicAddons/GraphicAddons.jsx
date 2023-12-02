import React, { Fragment } from "react";
import { Skeleton, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./graphicAddons.scss";

export const LoadingAvatar = () => {
  return (
    <Fragment>
      <Skeleton
        value="large"
        active
        avatar
        paragraph={{
          rows: 4,
        }}
      />
    </Fragment>
  );
};

export const TittleGraph = ({ title, tooltip }) => {
  return (
    <div className="title-class">
      <span>{title}</span>
      <Tooltip placement="right" title={tooltip}>
        <InfoCircleOutlined />
      </Tooltip>
    </div>
  );
};
