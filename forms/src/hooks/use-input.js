import {useState} from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [inputTouched, setInputTouched] = useState(false)
    const valueIsValid = validateValue(enteredValue)
    const hasError = inputTouched && !valueIsValid

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    }

    const valueBlurHandler = event => {
        setInputTouched(true)
    }

    const reset = () => {
        setInputTouched(false)
        setEnteredValue('')
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }
}

export default useInput