import React, { useState } from "react";
import { Button, Card, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AddCardComponent from "./AddCardComponent";
import SingleTask from "./SingleTask";
import TasksListClass from "@/core/class/TaskListClass";
import "./tasksList.scss";

const { TextArea } = Input;

const TasksList = ({ list, generalDictionary, ListMethods, TaskMethods }) => {
  const [showInputEdit, setShowInputEdit] = useState(false);
  const [titleListValue, setTitleListValue] = useState(list.title);

  const addHandleButton = () => {
    if (titleListValue !== "") {
      ListMethods.addTasksList(
        new TasksListClass({ ...list, title: titleListValue }).state
      );
    } else {
      setTitleListValue(list.title);
    }
    setShowInputEdit(false);
  };

  const cancelHandle = () => {
    setTitleListValue(list.title);
    setShowInputEdit(false);
  };

  const handleDelete = () => {
    ListMethods.deleteTasksList(list.id);
  };

  return (
    <>
      <Card
        className="tasksListContainer"
        title={
          showInputEdit ? (
            <TextArea
              autoSize
              value={titleListValue}
              autoFocus={true}
              onBlur={() => cancelHandle()}
              onChange={(event) => setTitleListValue(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  addHandleButton();
                }
              }}
            />
          ) : (
            <span onClick={() => setShowInputEdit(true)}>{titleListValue}</span>
          )
        }
        extra={
          <>
            <Button type="text" onClick={handleDelete}>
              <DeleteOutlined />
            </Button>
          </>
        }
      >
        {list.tasksList?.length > 0 &&
          list.tasksList?.map((task) => (
            <SingleTask
              key={task.id}
              task={task}
              TaskMethods={TaskMethods}
              listId={list.id}
            />
          ))}

        <AddCardComponent
          generalDictionary={generalDictionary}
          type={"CARD"}
          addHandle={TaskMethods.addTask}
          listId={list.id}
        />
      </Card>
    </>
  );
};

export default TasksList;
