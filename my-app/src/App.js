import React, {useState} from 'react';
import './App.css';
import ExpenseContainer from './componets/Expenses/ExpenseContainer';
import NewExpense from './componets/NewExpense/NewExpense';

const DUMMY_EXPENSES = [
  { title: 'Car Insurance', amount: 294.67, date: new Date(2021, 2, 28) },
  { title: 'Car Insurance', amount: 294.67, date: new Date(2020, 2, 28) },
  { title: 'Car Insurance', amount: 294.67, date: new Date(2019, 2, 28) },
  { title: 'Car Insurance', amount: 294.67, date: new Date(2021, 2, 28) }
]

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const addExpenseHandler = expense => {
    setExpenses([expense, ...expenses]);
    // setExpenses((prevExpenses) => {
    //   return [expense, ...prevExpenses];
    // })
  }

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler}/>
      <ExpenseContainer items={expenses}></ExpenseContainer>
    </div>
  );
}

export default App;
