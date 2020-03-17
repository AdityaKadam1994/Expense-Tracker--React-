import React from "react";
import Navigation from "./Navigation/navigation";

import { Route } from "react-router-dom";
// import "./App.css";
import ExpenseList from "./Expenselist/ExpenseList";
import AddExpense from "./AddExpense/AddExpense";
import ExpenseProvider from "./context/expense-context";

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <Navigation />
        <main>
          <Route path="/" component={ExpenseList} exact />
          <Route path="/add-expense" component={AddExpense} exact />
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;
