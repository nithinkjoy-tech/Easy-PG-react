import React, {useState} from "react";
import InputBox from "./../components/common/InputBox";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {setAuthToken} from "../services/authService"
import { userSignin } from "../api/user";
import { adminSignin } from "../api/admin";
import { displayNotification } from './../services/notificationService';

const validationSchema = Yup.object().shape({
    userId: Yup.string().required("Email or Username is required").label("Email or Username"),
    password: Yup.string().required("Password is required").label("Password"),
  });

function SigninPage() {

  const handleSubmit = async (values, setFieldError) => {
    if (window.location.pathname === "/signin") {
        const {data, status} = await userSignin(values);
        if (status === 400) setFieldError("userId", data);
        else if(status!==200) return displayNotification("error","Check your connection!")
        else {
          setAuthToken(data);
          window.location = "/";
        }
    }

    if (window.location.pathname === "/admin/signin") {
        const {data, status} = await adminSignin(values);
        if (status === 400) setFieldError("userId", data);
        else if(status!==200) return displayNotification("error","Check your connection!")
        else {
          setAuthToken(data);
          window.location = "/admin/adduser";
        }

    }
  };

  return (
    <Formik
      initialValues={{
        userId: "",
        password: ""
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {({errors, touched, values, handleChange, handleBlur}) => (
        <Form>
          <h3 style={{textAlign: "center"}}>{window.location.pathname=="/admin/signin"?"Admin Sign In":"Sign In"}</h3>
          <div style={{margin: "auto", width: "50%"}}>
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="User ID"
                values={values}
                type="text"
                name="userId"
                placeholder="User ID"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Password"
                values={values}
                type="password"
                name="password"
                placeholder="Password"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SigninPage;
