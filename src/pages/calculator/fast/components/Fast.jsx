import { Button, Card, Col, Form, Input, InputNumber, Row, Space } from "antd";
import HeaderSection from "@/components/headerSection/HeaderSection";
import React from "react";
import useFast from "../hooks/useFast";

const Fast = () => {
  const { initialValues, rules, handleSubmit } = useFast();
  return (
    <>
      <HeaderSection title={"Calculo rápido"} />
      <Row gutter={[24, 24]} className="">
        <Col span={12}>
          <Card>
            <span>Ingresa la nota</span>
            <Form initialValues={initialValues} onFinish={handleSubmit}>
              <Space direction="horizontal">
                <Form.Item name={"percent"}>
                  <InputNumber
                    placeholder="Porcentaje"
                    type="number"
                    suffix={"%"}
                    controls={false}
                    min={1}
                    max={100}
                  />
                </Form.Item>
                <Form.Item name={"value"}>
                  <InputNumber
                    placeholder="Valor"
                    controls={false}
                    min={0}
                    max={5}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType={"submit"}>
                    Agregar
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card>Graficas</Card>
        </Col>
      </Row>
    </>
  );
};

export default Fast;
