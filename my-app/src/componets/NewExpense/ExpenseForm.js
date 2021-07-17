import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  //we can use multiple states
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  
  const changeTitle = (event) => {
    setEnteredTitle(event.target.value)
  }

  const changeAmount = event => {
    setEnteredAmount(event.target.value)
  }

  const changeDate = event => {
    setEnteredDate(event.target.value)
  }

  const submitForm = (event) => {
    event.preventDefault();

    const data = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    }
    props.onSaveExpenseData(data); 
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  }
  return (
    <form onSubmit={submitForm}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={changeTitle} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={changeAmount}/>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" step="2022-12-31" value={enteredDate} onChange={changeDate}/>
        </div>
        <div className=".new-expense__actions">
          <button type="button" onClick={props.onCancel}>Cancel</button>
          <button type="submit">Add expense</button>
        </div>
      </div>
    </form>
  )
}

export default ExpenseForm;