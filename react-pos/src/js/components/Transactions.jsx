import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import CompleteTransactions from "./CompleteTransactions";
import axios from "axios";
import moment from "moment";

const HOST = "http://localhost:8001";
const url = HOST + `/api/all`;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: [] };
  }
  componentWillMount() {
    axios
      .get(url)
      .then(response => this.setState({ transactions: response.data }))
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    var { transactions } = this.state;

    var rendertransactions = () => {
      if (transactions.length === 0) {
        return (
          <tr key="0">
            <th>No Transactions found</th>
          </tr>
        );
      } else {
        return transactions.map(transaction => (
          <CompleteTransactions key={transaction._id} {...transaction} />
        ));
      }
    };

    return (
      <div className="container">
        <Header />
        <br />
        <br />

        <table className="pos table table-responsive table-striped table-hover">
          <thead>
            <tr>
              <th>Time</th>
              <th>Total</th>
              <th>Products</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>{rendertransactions()}</tbody>
        </table>
      </div>
    );
  }
}

export default Transactions;
