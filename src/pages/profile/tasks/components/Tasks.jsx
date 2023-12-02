import { Col, Row } from "antd";
import HeaderSection from "@/components/headerSection/HeaderSection";
import AddCardComponent from "@/components/tasksList/AddCardComponent";
import TasksList from "@/components/tasksList/TaskList";
import React from "react";
import useTasks from "../hooks/useTasks";
import "./tasks.scss";

const Tasks = () => {
  const { tasksData, generalDictionary, ListMethods, TaskMethods } = useTasks();

  return (
    <>
      <HeaderSection title={generalDictionary.TASKS} />
      <Row gutter={[8, 8]}>
        {tasksData?.map((list) => (
          <Col key={list.id} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
            <TasksList
              list={list}
              generalDictionary={generalDictionary}
              ListMethods={ListMethods}
              TaskMethods={TaskMethods}
            />
          </Col>
        ))}
        <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
          <AddCardComponent
            generalDictionary={generalDictionary}
            type={"LIST"}
            addHandle={ListMethods.addTasksList}
          />
        </Col>
      </Row>
    </>
  );
};

export default Tasks;
