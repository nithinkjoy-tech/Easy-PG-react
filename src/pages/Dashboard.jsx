import React, {useEffect, useState, useMemo} from "react";
import DataTable from "react-data-table-component";
import _ from "lodash";
import { getUsers } from './../api/user';
import DropDownSelect from "../components/common/DropDownSelect";
import CreateDebt from "./CreateDebt";
import {logout} from "../services/authService"
//name   username  email  amount-to-get   amount-to-pay

function Dashboard() {

    const viewDetails=(id)=>{
      window.location=`/dashboard/details/${id}`
    }


    const [userData, setUserData] = useState();
    const [addDebt,setAddDebt]=useState(false)

    const userLogout=()=>{
      logout()
      window.location="/signin"
    }
//   const handleDelete = roomBoyId => {
//     confirmAlert({
//       title: "Delete Room Boy",
//       message: "Are you sure want to delete room boy",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: async () => {
//             const {data, status} = await deleteRoomBoy(roomBoyId);
//             if (status !== 200) return displayNotification("error", data);

//             setRoomBoys(data);
//             displayNotification("info", "Successfully deleted room boy.");
//           },
//         },
//         {
//           label: "No",
//           onClick: () => {
//             return null;
//           },
//         },
//       ],
//     });
//   };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: row=>row["name"],
        sortable: true,
        grow:0
      },
      {
        name: "Username",
        selector: row=>row["username"],
        grow:0
      },
      {
        name: "Email",
        selector: row=>row["email"],
        grow:0
      },
      {
        name: "AmountToCollect",
        selector: row=>row["payableAmount"]||" - ",
      },
      {
        name: "Amount to pay",
        selector: row=>row["amountsToCollect"]||" - ",
      },
      {
        name: "",
        cell: row => (
          <td data-label="Delete">
            <button onClick={()=>viewDetails(row._id)} className="btn btn-secondary">
              View Details
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

    const getAllUsers=async()=>{
        const {data,status}=await getUsers()
        console.log(data);
        setUserData(data)
    }

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
    getAllUsers()
  }, []);

  return (
    <div style={{margin:"auto",width:"50%"}} className="dashboard-items">
      <button style={{marginTop:"40px"}} onClick={()=>userLogout()} className="btn btn-danger">Logout</button>
      {!addDebt&&<div className="arrivallist" style={{margin: 0}}>
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
      </div>}
      
      {!addDebt&&
      <>
      <button onClick={()=>setAddDebt(true)} className="btn btn-primary">Add new Debt</button></>}
      {addDebt&&<>
        <button onClick={()=>{setAddDebt(false)}} className="btn btn-secondary">Back</button>
        <CreateDebt/>
      </> }
    </div>
  );
}

export default Dashboard;
