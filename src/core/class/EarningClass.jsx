import React from "react";

class EarningClass extends React.Component {
  constructor(earning) {
    super(earning);
    this.state = {
      id: earning?.id ? earning.id : "",
      uid: earning?.uid ? earning.uid : "",
      name: earning?.name ? earning.name : "",
      periodicity: earning?.periodicity ? earning.periodicity : "",
      periodicityValue: earning?.periodicityValue
        ? earning.periodicityValue
        : 0,
      value: earning?.value ? earning.value : 0,
      monthValue: earning?.monthValue ? earning.monthValue : 0,
      dayValue: earning?.dayValue ? earning.dayValue : 0,
      yearValue: earning?.yearValue ? earning.yearValue : 0,
    };
  }
}

export default EarningClass;
