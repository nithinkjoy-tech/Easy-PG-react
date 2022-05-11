import React, {useEffect, useState, useMemo} from "react";
import {useNavigate} from "react-router-dom"
import DataTable from "react-data-table-component";
import _ from "lodash";
import {getTransactionDetails} from "./../api/user";

//name   amount-paid   payment-date

function TransactionDetails() {
  //   const viewTransactions = id => {
  //     window.location = `/dashboard/details/transactions/${id}`;
  //   };
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const findPath=()=>{
    console.log(window.location,"i")
  }

  const columns = useMemo(
    () => [
      {
        name: "Amount Paid",
        selector: row => "Rs. " + row["amountPaid"],
      },
      {
        name: "Date",
        selector: row => row["date"],
      },
      //   {
      //     name: "",
      //     cell: row => (
      //       <td data-label="Delete">
      //         <button onClick={() => viewTransactions(row._id)} className="btn btn-secondary">
      //           View Transactions
      //         </button>
      //       </td>
      //     ),
      //   },
    ],
    []
  );

  //   const handleChange = ({target}) => {
  //     let roomBoys = fullRoomBoys;
  //     setRoomBoys(
  //       roomBoys.filter(roomBoy => _.includes(roomBoy.city.toLowerCase(), target.value.toLowerCase()))
  //     );
  //   };

  const getTransactions = async () => {
    console.log(window.location, "lc");
    const {data, status} = await getTransactionDetails(window.location.pathname.substring(32));
    console.log(data);
    setUserData(data);
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
    getTransactions();
  }, []);

  return (
    <div style={{margin: "auto", width: "50%"}} className="dashboard-items">
      <button onClick={() => navigate(-1)} className="btn btn-secondary">
        Back
      </button>
      <div className="arrivallist" style={{margin: 0}}>
        <>
          <DataTable
            title="Transactions"
            pagination
            subHeader
            //subHeaderComponent={`Transaction details of item ${}`}
            noDataComponent="No transaction details available"
            columns={columns}
            data={userData}
          />
        </>
      </div>
    </div>
  );
}

export default TransactionDetails;
//acces data from transactions
