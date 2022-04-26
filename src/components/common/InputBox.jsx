import React from "react";
import Error from "./../forms/Error";
import {ErrorMessage} from "formik";

function InputBox({label, type, placeholder, handleChange, handleBlur, values, name, multiline,className}) {
  return (
    <div>
      {label && (
        <label
          className="block uppercase text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          {label}
        </label>
      )}
      <input
        onBlur={handleBlur}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[name]}
        autoComplete="off"
        multiline={multiline}
        className={className}
      />
      <ErrorMessage name={name} component={Error} />
    </div>
  );
}

export default InputBox;
