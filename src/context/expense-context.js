import React, { useState, useEffect } from "react";

export const ExpenseContext = React.createContext();

const ExpenseProvider = props => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    // https://react-hooks-db-51a7d.firebaseio.com/ingredients.json
    fetch("https://expense-tracker-db-9d27a.firebaseio.com/expenses.json")
      .then(response => response.json())
      .then(responseData => {
        const loadedExpenses = [];
        for (const key in responseData) {
          loadedExpenses.push({
            id: key,
            item: responseData[key].item,
            amount: responseData[key].amount,
            quantity: responseData[key].quantity,
            note: responseData[key].note,
            date: responseData[key].date,
            paymentmode: responseData[key].paymentmode,
            paymentstatus: responseData[key].paymentstatus
          });
        }
        setExpenses(loadedExpenses);
        console.log(responseData);
      });
  }, []);
  return (
    <ExpenseContext.Provider value={[expenses, setExpenses]}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
