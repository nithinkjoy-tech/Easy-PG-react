import React from "react";
import {useState, useEffect} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {createDebt, getUsers} from "./../api/user";
import InputBox from "./../components/common/InputBox";
import DropDownSelect from "./../components/common/DropDownSelect";
import _ from "lodash";

export default function CreateDebt() {
  const [options, setOptions] = useState([]);

  const validationSchema = Yup.object().shape({
    debtors: Yup.array().required("Debtors is required").label("Debtots"),
    amount: Yup.number().required(),
  });

  const handleSubmit = async (values, setFieldError) => {
    values["debtors"] = values.debtors[0].split(",");
    if (!values.debtors[0]) setFieldError("debtors", "Minimum one debtors should be there.");
    if (_.indexOf(values.debtors, "true") >= 0) {
      values["includingMe"] = true;
      values["debtors"] = _.pull(values.debtors, "true");
    } else {
      values["includingMe"] = false;
    }

    const {data, status} = await createDebt(values);
    if (status == 200) window.location = "/dashboard";
  };

  const getAllUsers = async () => {
    let {data, status} = await getUsers();
    let usersData = [];
    data.forEach(element => {
      let obj = {};
      obj["label"] = element["username"];
      obj["value"] = element["_id"];
      usersData.push(obj);
    });
    usersData.push({label: "Including Me", value: true});
    console.log(usersData, "ll");
    setOptions(usersData);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Formik
      initialValues={{
        //includingMe: "",
        debtors: [],
        amount: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
    >
      {({errors, touched, values, handleChange, handleBlur, setFieldValue}) => (
        <Form>
          <h3 style={{textAlign: "center"}}>Add Debt</h3>
          <div style={{margin: "auto", width: "50%"}}>
          <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Debt Name"
                values={values}
                type="text"
                name="debtName"
                placeholder={`Enter name for this debt`}
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <DropDownSelect
                options={options}
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Users"
                values={values}
                type="text"
                name="debtors"
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <InputBox
                error={errors}
                handleBlur={handleBlur}
                touched={touched}
                label="Amount"
                values={values}
                type="text"
                name="amount"
                placeholder="Amount"
                handleChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Add Debt
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
