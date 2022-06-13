import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";
import {debtDetails} from "./../api/user";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {confirmAlert} from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import InputBox from "../components/common/InputBox";
import {displayNotification} from "./../services/notificationService";
//name   amount-pending   amount-paid   total-amount    view-Transactions

function EachDebtDetails() {

  const getDebtDetails = async () => {
    const {data, status} = await debtDetails(window.location.pathname.substring(23));
    console.log(data, "dt");
    setUserData(data);
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
          <span style={{color: "black"}}>{"Rs. " + row["amountPending"]}</span>
        ),
      },
      {
        name: "Amount Paid",
        selector: row => "Rs. " + row["amountPaid"],
      },
      {
        name: "Total Amount",
        selector: row => "Rs. " + row["amount"],
      },
      {
        name:"date",
        selector: row => row["date"],
      },
      {
        name: "Status",
        selector: row => row["status"],
      }
    ],
    []
  );

  //   const handleChange = ({target}) => {
  //     let roomBoys = fullRoomBoys;
  //     setRoomBoys(
  //       roomBoys.filter(roomBoy => _.includes(roomBoy.city.toLowerCase(), target.value.toLowerCase()))
  //     );
  //   };

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
    getDebtDetails();
  }, []);

  return (
    <>
      <button
        style={{marginTop: "30px", marginLeft: "90px"}}
        onClick={() => (window.location = "/")}
        className="btn btn-secondary"
      >
        Back
      </button>
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
    </>
  );
}

export default EachDebtDetails;
//acces data from transactions
