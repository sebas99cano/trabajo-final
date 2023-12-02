import React from "react";

class ExpenseClass extends React.Component {
  constructor(expense) {
    super(expense);
    this.state = {
      id: expense?.id ? expense.id : "",
      uid: expense?.uid ? expense.uid : "",
      name: expense?.name ? expense.name : "",
      periodicity: expense?.periodicity ? expense.periodicity : "",
      periodicityValue: expense?.periodicityValue
        ? expense.periodicityValue
        : 0,
      value: expense?.value ? expense.value : 0,
      monthValue: expense?.monthValue ? expense.monthValue : 0,
      dayValue: expense?.dayValue ? expense.dayValue : 0,
      yearValue: expense?.yearValue ? expense.yearValue : 0,
    };
  }
}

export default ExpenseClass;
