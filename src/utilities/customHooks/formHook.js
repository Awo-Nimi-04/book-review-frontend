import React, { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isValid = true;
      for (const input in state.inputs)
        if (input === action.id) isValid = isValid && action.valid;
        else isValid = isValid && state.inputs[input].isValid;

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.valid },
        },
        formIsValid: isValid,
      };
    case "SET_FORM":
      return {
        formIsValid: action.valid,
        inputs: action.inputs ,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    formIsValid: initialFormValidity,
  });

  const handleInputChange = useCallback((id, valid, value) => {
    dispatch({ type: "INPUT_CHANGE", id: id, valid: valid, value: value });
  }, []);

  const handleSetForm = useCallback((inputs, valid) => {
    dispatch({ type: "SET_FORM", inputs: { ...inputs }, valid: valid });
  }, []);

  return [formState, handleInputChange, handleSetForm];
};

export default useForm;
