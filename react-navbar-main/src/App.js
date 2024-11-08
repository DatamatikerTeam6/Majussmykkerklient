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
        </Routes>
      </div>
    </>
  );
}

export default App;
