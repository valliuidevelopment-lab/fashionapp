import React from "react";
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router";

import { resetFilters } from "../feature/contentSlice"; 

function ResetButton() {

  const dispatch = useDispatch();

  const [, setSearchParams] = useSearchParams();

  const onReset = () => {
    dispatch(resetFilters());
    setSearchParams({});
  };
  return (
    <button onClick={onReset} className="px-3 py-2 border rounded float-end reset-btn">Reset</button>
  );
}

export default ResetButton;