import { ErrorMessage } from "formik";
import React, {useState} from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Error from './../forms/Error';

const DropDownSelect = ({options,handleBlur,touched,handleChange,setFieldValue,values,name}) => {

  const handleOnChange = val => {
    setFieldValue("debtors",[val])
  };

  return (
    <div className="app">
      <label>Select users</label>
      <MultiSelect onChange={handleOnChange} options={options} />
      <ErrorMessage name={name} component={Error} />
    </div>
  );
};

export default DropDownSelect;
