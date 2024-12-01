import Navbar from "./Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Review from "./pages/Review";
import Order from "./pages/Order";
import Header from "./Navbar"; 
import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Customer from "./pages/Customer";
import ViewOrders from "./pages/ViewOrders";
import UpdateOrder from "./pages/UpdateOrder";
import ViewCustomers from "./pages/ViewCustomers";
import UpdateCustomer from "./pages/UpdateCustomer";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* Render Header only if the token exists */}
      {token ? <Header /> : null}

      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Order" element={<Order />} /> 
          <Route path="/Review" element={<Review />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/ViewOrders" element={<ViewOrders />} />
          <Route path="/UpdateOrder" element={<UpdateOrder />} />
          <Route path="/ViewCustomers" element={<ViewCustomers />} />
          <Route path="/UpdateCustomer" element={<UpdateCustomer />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
