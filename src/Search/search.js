import React, { useRef, useState, useContext } from "react";

import "./search.css";
import { ExpenseContext } from "../context/expense-context";

const Search = props => {
  const expRef = useRef();
  const [search, setSearch] = useState("");
  const [expenses, setExpenses] = useContext(ExpenseContext);

  const onSearchHandler = query => {
    setSearch(query);
    setTimeout(() => {
      if (query.length !== 0 && query === expRef.current.value) {
        fetch(
          `https://expense-tracker-db-9d27a.firebaseio.com/expenses.json?orderBy="item"&equalTo="${query}"&orderBy="paymentstatus"&equalTo="${query}"`
        )
          .then(response => response.json())
          .then(responseData => {
            const loadedExpenses = [];
            if (responseData) {
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
            } else {
              return false;
            }
            setExpenses(loadedExpenses);
          });
      } else {
        fetch(`https://expense-tracker-db-9d27a.firebaseio.com/expenses.json`)
          .then(response => response.json())
          .then(responseData => {
            const loadedExpenses = [];
            if (responseData) {
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
            } else {
              return false;
            }
            setExpenses(loadedExpenses);
          });
      }
    }, 500);
  };
  return (
    <div className="search-wrapper">
      <input
        type="text"
        ref={expRef}
        placeholder="Search..."
        onChange={event => {
          onSearchHandler(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
