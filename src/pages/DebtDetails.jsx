import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";
import {getDebtDetails, getMaxAmount, updateTransaction} from "./../api/user";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputBox from "../components/common/InputBox";
import { displayNotification } from './../services/notificationService';
import Loader from './../components/common/Loader';
//name   amount-pending   amount-paid   total-amount    view-Transactions


function DebtDetails() {
  const viewTransactions = id => {
    window.location = `/dashboard/details/transactions/${id}`;
  };

  const handleSubmit = async (values, setFieldError) => {
    let newValues = {};
    newValues["userId"] = row.debtorId;
    newValues["amountPaid"] = Number(values["amountPaid"]);
    newValues["transactionId"] = row._id;
    updatePayment(newValues);
  };
  const updatePayment = values => {
    confirmAlert({
      title: "Confirm Payment",
      message: "Are you sure want to update payment",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const {data, status} = await updateTransaction(values);
            console.log(data);
            if (status !== 200) return displayNotification("error", "Something went wrong");
            displayNotification("success","Successfully updated");
            window.location = window.location.pathname;
          },
        },
        {
          label: "No",
          onClick: () => {
            return null;
          },
        },
      ],
    });
  };

  const [maxAmount, setMaxAmount] = useState();
  const [row, setRow] = useState();
  const [isLoading, setIsLoading] = useState(true)

  const validationSchema = Yup.object().shape({
    amountPaid: Yup.number().min(1).max(maxAmount).label("Amount"),
    debtName: Yup.string().min(1).max(50).label("Debt Name"),
  });

  const markPaid = async row => {
    console.log(row, "rw");
    setRow(row);
    const {data, status} = await getMaxAmount(row._id);
    setMaxAmount(data.maxAmount);
  };

  const [userData, setUserData] = useState();

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: row => row["debtName"],
        sortable: true,
      },
      {
        name: "Amount Pending",
        selector: row => (
          <span style={{color: "black"}}>{"Rs. " + Number(row["amount"] - row["paid"])}</span>
        ),
      },
      {
        name: "Amount Paid",
        selector: row => "Rs. " + row["paid"],
      },
      {
        name: "Total Amount",
        selector: row => "Rs. " + row["amount"],
      },
      {
        name: "Status",
        selector: row => row["status"],
      },
      {
        name: "",
        cell: row => (
          <td data-label="Delete">
            <button onClick={() => viewTransactions(row._id)} className="btn btn-secondary">
              Payment Details
            </button>
          </td>
        ),
        grow: 1,
      },
      {
        name: "",
        cell: row =>
          row["status"] == "completed" || (
            <td data-label="Delete">
              <button onClick={() => markPaid(row)} className="btn btn-success">
                Mark Paid
              </button>
            </td>
          ),
      },
    ],
    []
  );

  //   const handleChange = ({target}) => {
  //     let roomBoys = fullRoomBoys;
  //     setRoomBoys(
  //       roomBoys.filter(roomBoy => _.includes(roomBoy.city.toLowerCase(), target.value.toLowerCase()))
  //     );
  //   };

  const getDetails = async () => {
    console.log(window.location, "lc");
    const {data, status} = await getDebtDetails(window.location.pathname.substring(19));
    _.reverse(data)
    console.log(data);
    setUserData(data);
    setIsLoading(false)
  };

  //   const getAllRoomBoys = async () => {
  //     if (hotelId) {
  //       const {status: resStatus} = await getHotelRooms(hotelId);
  //       if (resStatus !== 200) return displayNotification("error", "Invalid URL");
  //     }

  //     const {data, status} = await getRoomBoys(hotelId);
  //     if (status !== 200) return displayNotification("error", data);
  //     setRoomBoys(data);
  //     setFullRoomBoys([...data]);
  //   };

  useEffect(() => {
    // getAllRoomBoys();
    getDetails();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {!maxAmount && (
        <button
          style={{marginTop: "30px", marginLeft: "90px"}}
          onClick={() => (window.location = "/")}
          className="btn btn-secondary"
        >
          Back
        </button>
      )}
      {!maxAmount && (
        <div style={{margin: "auto", width: "90%"}} className="">
          <div className="" style={{margin: 0}}>
            <>
              <DataTable
                title="Repayment Details"
                pagination
                subHeader
                noDataComponent="No payment details available"
                columns={columns}
                data={userData}
              />
            </>
          </div>
        </div>
      )}

      {maxAmount && (
        <>
          <button
            style={{marginLeft: "50px", marginTop: "20px"}}
            onClick={() => {
              setMaxAmount(0);
            }}
            className="btn btn-secondary"
          >
            Back
          </button>

          <Formik
            initialValues={{
              amountPaid: "",
              row: "",
              debtName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {setFieldError}) => handleSubmit(values, setFieldError)}
          >
            {({errors, touched, values, handleChange, handleBlur, setFieldValue}) => (
              <Form>
                <h3 style={{textAlign: "center"}}>Pay Amount</h3>
                <div style={{margin: "auto", width: "50%"}}>
                  <div className="form-group">
                    <InputBox
                      error={errors}
                      handleBlur={handleBlur}
                      touched={touched}
                      label="Amount"
                      values={values}
                      type="text"
                      name="amountPaid"
                      placeholder={`Amount to pay is ${maxAmount}`}
                      handleChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{marginTop: "20px"}}
                    className="btn btn-primary btn-block"
                  >
                    Make Payment
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

export default DebtDetails;
//acces data from transactions
