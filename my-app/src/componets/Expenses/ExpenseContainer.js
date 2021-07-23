import React, { useState } from 'react';
import Card from "../UI/Card"
import "./ExpenseContainer.css";
import ExpenseFilter from "./ExpenseFilter";
import "./ExpenseContainer.css";
import ExpensesList from './ExpensesList';
import ExpenseChart from './ExpensesChart';

const ExpenseContainer = (props) => {

  const [filteredYear, setSelectedYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setSelectedYear(selectedYear);
  }
  const filteredExpenses = props.items.filter(e => {
    return e.date.getFullYear().toString() === filteredYear;
  });


  return (
    <Card className="expenses">
      <ExpenseFilter
        selected={filteredYear}
        onSelectChoice={filterChangeHandler}
      />
      <ExpenseChart expenses={filteredExpenses}/>
      <ExpensesList items={filteredExpenses}/>
    </Card>
  );
}

export default ExpenseContainer;