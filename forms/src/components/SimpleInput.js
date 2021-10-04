import {useState} from 'react'
import useInput from './../hooks/use-input'

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => value.includes('@')

const SimpleInput = (props) => {
    const {
        value: enteredValue,
        hasError: inputHasError,
        isValid: enteredInputIsValid,
        valueChangeHandler: inputChangedHandler,
        valueBlurHandler: inputBlurHandler,
        reset: resetInput

    } = useInput(isNotEmpty)

    const {
        value: enteredEmailValue,
        hasError: inputEmailHasError,
        isValid: enteredInputEmailIsValid,
        valueChangeHandler: inputEmailChangedHandler,
        valueBlurHandler: inputEmailBlurHandler,
        reset: resetInputEmail
    } = useInput(isEmail)

    let formIsValid = false;
    if(enteredInputIsValid && enteredInputEmailIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = event => {
        event.preventDefault()
        if(!formIsValid) {
            return
        }
        resetInput()
        resetInputEmail()
    }

    const nameInputClasses = inputHasError ? 'form-control' : 'form-control invalid '
    const emailInputClasses = inputEmailHasError ? 'form-control' : 'form-control invalid '
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={inputChangedHandler} onBlur={inputBlurHandler} value={enteredValue}/>
          {enteredInputIsValid && <p className={'error-text'}>Invalid input. Entered name must not be empty.</p>}
      </div >
        <div className={emailInputClasses}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' onChange={inputEmailChangedHandler} onBlur={inputEmailBlurHandler} value={enteredEmailValue}/>
            {enteredInputEmailIsValid && <p className={'error-text'}>Invalid input. Entered email must not be empty.</p>}
        </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
