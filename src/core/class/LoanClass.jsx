import moment from "moment/moment";
import React from "react";

class LoanClass extends React.Component {
  constructor(loan) {
    super(loan);
    this.state = {
      id: loan?.id ? loan.id : "",
      uid: loan?.uid ? loan.uid : "",
      name: loan?.name ? loan.name : "",
      value: loan?.value ? loan.value : 0,
      interests: loan?.interests ? loan.interests : 0,
      initialDate: loan?.initialDate
        ? moment(loan.initialDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      periodicity: loan?.periodicity ? loan.periodicity : "",
      description: loan?.description ? loan.description : "",
    };
  }
}

export default LoanClass;
