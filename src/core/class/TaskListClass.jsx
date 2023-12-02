import React from "react";

class TasksListClass extends React.Component {
  constructor(list) {
    super(list);
    this.state = {
      id: list.id ? list.id : "",
      uid: list.uid ? list.uid : "",
      title: list.title ? list.title : "",
      tasksList: list.tasksList ? list.tasksList : [],
      date: list.date ? list.date : Date.now(),
    };
  }
}

export default TasksListClass;
