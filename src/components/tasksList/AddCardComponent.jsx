import React, { useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskClass from "@/core/class/TaskClass";
import TasksListClass from "@/core/class/TaskListClass";
const { TextArea } = Input;
const AddCardComponent = ({ generalDictionary, type, addHandle, listId }) => {
  const [addCollapse, setAddCollapse] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addHandleButton = () => {
    if (inputValue !== "") {
      type === "CARD"
        ? addHandle(
            listId,
            new TaskClass({ title: inputValue, status: true }).state
          )
        : addHandle(new TasksListClass({ title: inputValue }).state);
    }
    setAddCollapse(false);
    setInputValue("");
  };

  const cancelHandleButton = () => {
    setAddCollapse(false);
    setInputValue("");
  };

  return (
    <>
      {addCollapse ? (
        <div className="addTitleForm">
          <TextArea
            className="inputTitle"
            size="large"
            autoSize={true}
            value={inputValue}
            placeholder={
              type === "LIST"
                ? generalDictionary.ADD_TITLE
                : generalDictionary.ADD_TASK
            }
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addHandleButton();
              }
            }}
            onBlur={cancelHandleButton}
            autoFocus={true}
          />
          <Button
            onMouseDown={addHandleButton}
            type={"primary"}
            className="addButtonConfirm"
          >
            {generalDictionary.ADD}
          </Button>
          <Button
            className="addButtonCancel"
            onMouseDown={cancelHandleButton}
            type={"danger"}
          >
            {generalDictionary.CANCEL}
          </Button>
        </div>
      ) : (
        <Button
          size="large"
          type="text"
          className={"addButton"}
          icon={<PlusOutlined />}
          onClick={() => setAddCollapse(true)}
        >
          {type === "LIST"
            ? generalDictionary.ADD_LIST
            : generalDictionary.ADD_TASK}
        </Button>
      )}
    </>
  );
};

export default AddCardComponent;
