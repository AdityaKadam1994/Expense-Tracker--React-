import React, { useContext } from "react";
import "./expenselist.css";

import { ExpenseContext } from "../context/expense-context";
const ExpenseList = props => {
  console.log(props);

  const [expenses, setExpenses] = useContext(ExpenseContext);
  const removeExpense = Expid => {
    console.log(Expid);
    fetch(
      `https://expense-tracker-db-9d27a.firebaseio.com/expenses/${Expid}.json`,
      {
        method: "DELETE"
      }
    ).then(response => {
      setExpenses(prevExp => prevExp.filter(item => item.id !== Expid));
    });
  };

  console.log(expenses);
  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Payment Status</th>
            <th>Payment Mode</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td>{exp.item}</td>
              <td>{exp.amount}</td>
              <td>{exp.quantity}</td>
              <td>{exp.date}</td>
              <td>{exp.paymentstatus}</td>
              <td>{exp.paymentmode}</td>
              <td>{exp.note}</td>
              <td>
                <button
                  type="button"
                  onClick={() => {
                    removeExpense(exp.id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
