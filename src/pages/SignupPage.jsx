import React, {useState} from "react";
import InputBox from "./../components/common/InputBox";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import Error from "./../components/forms/Error";
import {ErrorMessage} from "formik";
import { setAuthToken } from "../services/authService";
import { addUser } from './../api/admin';
import { displayNotification } from './../services/notificationService';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required("Name is required").label("Name"),
  email: Yup.string().required("Email is required").email("Email must be valid").label("Email"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, "Invalid Username")
    .label("Username"),
  password: Yup.string().required("Password is required").min(6).max(256).label("Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function SignupPage({location}) {
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = async (values, setFieldError) => {
    console.log(values, "vl");
    if (window.location.pathname === "/admin/adduser") {
        const {data, status} = await addUser(values);
        if (status !== 200) setFieldError("userId", data);
        else {
          displayNotification("success","User successfully added")
        }
    }

    if (window.location.pathname === "/admin/signin") {
      //   const {data, status} = await adminSignin(values);
      //   if (status === 400) setFieldError("userId", data);
      //   else {
      //     setAuthToken(data);
      //     window.location = "/admin/dashboard";
      //   }
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {({errors, touched, values, handleChange, handleBlur}) => (
        <Form>
          <h3 style={{textAlign: "center"}}>Add User</h3>
          <div style={{margin: "auto", width: "50%"}}>
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Name"
                values={values}
                type="text"
                name="name"
                placeholder="Name"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Username"
                values={values}
                type="text"
                name="username"
                placeholder="Userame"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Email"
                values={values}
                type="text"
                name="email"
                placeholder="Email"
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
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Confirm Password"
                values={values}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Add User
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignupPage;
