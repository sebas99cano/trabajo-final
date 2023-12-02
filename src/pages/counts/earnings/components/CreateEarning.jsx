import React, { useContext } from "react";
import { ThemeContext } from "@/core/context";
import { numThousand, parserNumber } from "@/helpers/utils/validateFormat";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";

const CreateEarning = ({
  isVisible,
  expenseToEdit,
  handleCancel,
  handleCreate,
  loadingModal,
}) => {
  const [themeState] = useContext(ThemeContext);
  const { generalDictionary } = themeState;
  const initialValues = expenseToEdit.id ? expenseToEdit : null;
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
    periodicityRules: [
      {
        required: true,
        message: generalDictionary.VALIDATE_PERIODICITY,
      },
    ],
  };
  return (
    <Modal
      closable={false}
      destroyOnClose={true}
      maskClosable={false}
      title={generalDictionary.ADD_EARNING}
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
                </Select>
              </Form.Item>

              {isVisible.visualize && (
                <>
                  <Form.Item
                    name={"dayValue"}
                    label={generalDictionary.DAY_VALUE}
                  >
                    <InputNumber
                      disabled={true}
                      prefix="$"
                      style={{ width: "100%" }}
                      controls={false}
                      formatter={(value) => numThousand(value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"monthValue"}
                    label={generalDictionary.MONTH_VALUE}
                  >
                    <InputNumber
                      disabled={true}
                      prefix="$"
                      style={{ width: "100%" }}
                      controls={false}
                      formatter={(value) => numThousand(value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={"yearValue"}
                    label={generalDictionary.YEAR_VALUE}
                  >
                    <InputNumber
                      disabled={true}
                      prefix="$"
                      style={{ width: "100%" }}
                      controls={false}
                      formatter={(value) => numThousand(value)}
                    />
                  </Form.Item>
                </>
              )}

              <Form.Item
                wrapperCol={24}
                style={{ textAlign: "center", marginTop: "10px" }}
              >
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

export default CreateEarning;
