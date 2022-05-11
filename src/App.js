import {Switch,Route} from  "react-router-dom"
import {ToastContainer} from "react-toastify";
import "./App.css";
import AdminRoute from './components/common/AdminRoute';
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import DebtDetails from "./pages/DebtDetails";
import TransactionDetails from './pages/TransactionDetails';
import DropDownSelect from './components/common/DropDownSelect';
import UserRoute from './components/common/UserRoute';

function App() {
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"colored"}
      />
    <Switch>
      <AdminRoute exact path="/admin/adduser" component={SignupPage} />
      <Route exact path="/admin/signin" component={SigninPage} />
      <Route exact path="/signin" component={SigninPage} />
      <UserRoute exact path="/dashboard/details/transactions/:id" component={TransactionDetails} />
      <UserRoute exact path="/dashboard/details/:id" component={DebtDetails} />
      <UserRoute exact path="/" component={Dashboard} />
    </Switch>
    </>
  );
}

export default App;
