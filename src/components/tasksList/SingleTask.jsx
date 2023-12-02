import React, { useState } from "react";
import { Button, Card, Col, Input, Row, Tooltip, Typography } from "antd";
import { DeleteOutlined, CheckSquareOutlined } from "@ant-design/icons";
import TaskClass from "@/core/class/TaskClass";

const { TextArea } = Input;
const { Text } = Typography;

const SingleTask = ({ task, TaskMethods, listId }) => {
  const [showActions, setShowActions] = useState(false);
  const [showInputEdit, setShowInputEdit] = useState(false);
  const [titleTaskValue, setTitleTaskValue] = useState(task.title);
  const [statusTask, setStatusTask] = useState(task.status);

  const addHandleButton = (status) => {
    setStatusTask(status);
    TaskMethods.addTask(
      listId,
      new TaskClass({ ...task, title: titleTaskValue, status: status }).state
    );
    setShowInputEdit(false);
    setShowActions(false);
  };

  const deleteHandle = () => {
    TaskMethods.deleteTask(listId, task.id);
  };

  return (
    <>
      <Card
        className="singleTask"
        key={task.id}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onBlur={() => setShowActions(false)}
      >
        <Row gutter={[8, 8]} className="taskContainer">
          <Col span={21} onClick={() => setShowInputEdit(true)}>
            {showInputEdit ? (
              <TextArea
                autoSize
                value={titleTaskValue}
                autoFocus={true}
                onBlur={() => setShowInputEdit(false)}
                onChange={(event) => setTitleTaskValue(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    addHandleButton(true);
                  }
                }}
              />
            ) : (
              <Text className="spanText" delete={!statusTask}>
                {titleTaskValue}
              </Text>
            )}
          </Col>

          <Col span={3}>
            {showActions && (
              <>
                <Tooltip
                  placement="right"
                  title={statusTask ? "Marcar como terminada" : "Desmarcar"}
                >
                  <Button
                    type="text"
                    size="small"
                    onMouseDown={() => addHandleButton(!statusTask)}
                  >
                    <CheckSquareOutlined />
                  </Button>
                </Tooltip>
                <Tooltip placement="right" title={"Eliminar"}>
                  <Button type="text" size="small" onMouseDown={deleteHandle}>
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SingleTask;
