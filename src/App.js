import {Routes,Route} from  "react-router-dom"
import "./App.css";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import DebtDetails from "./pages/DebtDetails";
import TransactionDetails from './pages/TransactionDetails';
import DropDownSelect from './components/common/DropDownSelect';

function App() {
  return (
    <Routes>
      <Route exact path="/admin/adduser" element={<SignupPage/>} />
      <Route exact path="/signin" element={<SigninPage/>} />
      <Route exact path="/dashboard/details/transactions/:id" element={<TransactionDetails/>} />
      <Route exact path="/dashboard/details/:id" element={<DebtDetails/>} />
      <Route exact path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;
