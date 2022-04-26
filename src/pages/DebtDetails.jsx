import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";
import {getDebtDetails} from "./../api/user";

//name   amount-pending   amount-paid   total-amount    view-Transactions

function DebtDetails() {
  const viewTransactions = id => {
    window.location = `/dashboard/details/transactions/${id}`;
  };

  const [userData, setUserData] = useState();

  const columns = useMemo( 
    () => [
      {
        name: "Name",
        selector: row => row["name"],
        sortable: true,
      },
      {
        name: "Amount Pending",
        selector: row => "Rs. "+ Number(row["amount"]-row["paid"]),
      },
      {
        name: "Amount Paid",
        selector: row =>"Rs. "+ row["paid"],
      },
      {
        name: "Total Amount",
        selector: row => "Rs. "+ row["amount"],
      },
      {
        name: "",
        cell: row => (
          <td data-label="Delete">
            <button onClick={() => viewTransactions(row._id)} className="btn btn-secondary">
              View Transactions
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
      console.log(window.location,"lc");
    const {data, status} = await getDebtDetails(window.location.pathname.substring(19));
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
    getDetails();
  }, []);

  return (
    <div style={{margin: "auto", width: "50%"}} className="dashboard-items">
      <div className="arrivallist" style={{margin: 0}}>
        <>
          <DataTable
            title="Users"
            pagination
            subHeader
            noDataComponent="No users in the list"
            columns={columns}
            data={userData}
          />
        </>
      </div>
    </div>
  );
}

export default DebtDetails;
//acces data from transactions