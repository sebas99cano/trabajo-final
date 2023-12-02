import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import { numThousand, parserNumber } from "@/helpers/utils/validateFormat";
import moment from "moment";
import React from "react";
import "./loans.scss";

const CreateLoan = ({
  generalDictionary,
  isVisible,
  loanToEdit,
  handleCancel,
  handleCreate,
  loadingModal,
}) => {
  const initialValues = loanToEdit.id
    ? { ...loanToEdit, initialDate: moment(loanToEdit.initialDate) }
    : null;

  const rules = {
    nameRules: [
      {
        required: true,
        type: "string",
        min: 3,
        max: 30,
        message: generalDictionary.VALIDATE_NAME,
      },
    ],
    valueRules: [
      {
        transform: (value) => parseFloat(value),
        required: true,
        type: "number",
        min: 1,
        max: 999999999999,
        message: generalDictionary.VALIDATE_VALUE,
      },
    ],
    interestsRules: [
      {
        transform: (value) => parseFloat(value),
        type: "number",
        min: 0,
        max: 999999999999,
        message: generalDictionary.VALIDATE_VALUE,
      },
    ],
    periodicityRules: [
      {
        required: true,
        message: generalDictionary.VALIDATE_PERIODICITY,
      },
    ],
    initialDateRules: [
      {
        required: true,
        message: generalDictionary.VALIDATE_DATE,
      },
    ],
    descriptionRules: [
      {
        type: "string",
        min: 0,
        max: 300,
        message: generalDictionary.VALIDATE_DESCRIPTION,
      },
    ],
  };

  return (
    <Modal
      closable={false}
      destroyOnClose={true}
      maskClosable={false}
      title={generalDictionary.ADD_LOAN}
      open={isVisible.state}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin
        tip={generalDictionary.SAVING}
        spinning={loadingModal}
        delay={500}
        size={"large"}
      >
        <Row>
          <Col span={24}>
            <Form
              initialValues={initialValues}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 15 }}
              onFinish={(values) =>
                handleCreate(values, initialValues ? initialValues : null)
              }
            >
              <Form.Item
                name={"name"}
                label={generalDictionary.NAME}
                rules={rules.nameRules}
                hasFeedback
              >
                <Input
                  disabled={isVisible.visualize}
                  type={"text"}
                  placeholder={generalDictionary.NAME}
                />
              </Form.Item>
              <Form.Item
                name={"initialDate"}
                label={generalDictionary.INITIAL_DATE}
                rules={rules.initialDateRules}
                hasFeedback
              >
                <DatePicker
                  disabled={isVisible.visualize}
                  placeholder={generalDictionary.INITIAL_DATE}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name={"value"}
                label={generalDictionary.VALUE}
                rules={rules.valueRules}
                hasFeedback
              >
                <InputNumber
                  disabled={isVisible.visualize}
                  prefix="$"
                  style={{ width: "100%" }}
                  controls={false}
                  formatter={(value) => numThousand(value)}
                  parser={(value) => parserNumber(value)}
                />
              </Form.Item>
              <Form.Item
                name={"periodicity"}
                label={generalDictionary.PERIODICITY}
                rules={rules.periodicityRules}
                hasFeedback
              >
                <Select
                  placeholder={generalDictionary.PERIODICITY}
                  disabled={isVisible.visualize}
                >
                  <Select.Option value={"monthValue"}>
                    {generalDictionary.MONTHLY}
                  </Select.Option>
                  <Select.Option value={"dayValue"}>
                    {generalDictionary.DAILY}
                  </Select.Option>
                  <Select.Option value={"yearValue"}>
                    {generalDictionary.ANNUAL}
                  </Select.Option>
                  <Select.Option value={"none"}>
                    {generalDictionary.NONE}
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"interests"}
                label={generalDictionary.INTERESTS}
                rules={rules.interestsRules}
                hasFeedback
              >
                <InputNumber
                  disabled={isVisible.visualize}
                  prefix="$"
                  style={{ width: "100%" }}
                  controls={false}
                  formatter={(value) => numThousand(value)}
                  parser={(value) => parserNumber(value)}
                />
              </Form.Item>
              <Form.Item
                name={"description"}
                label={generalDictionary.DESCRIPTION}
                rules={rules.descriptionRules}
                hasFeedback
              >
                <Input.TextArea
                  disabled={isVisible.visualize}
                  type={"text"}
                  placeholder={generalDictionary.DESCRIPTION}
                />
              </Form.Item>
              <Form.Item wrapperCol={24} className={"loansFormCenter"}>
                {!isVisible.visualize && (
                  <Button
                    type={"primary"}
                    htmlType={"submit"}
                    style={{ marginRight: "8px" }}
                    disabled={loadingModal}
                  >
                    {generalDictionary.ACCEPT}
                  </Button>
                )}
                <Button
                  type={"default"}
                  onClick={handleCancel}
                  disabled={loadingModal}
                >
                  {generalDictionary.CANCEL}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default CreateLoan;
