import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Reservation from "./pages/Reservation.jsx";
import ConfirmReservation from "./pages/ConfirmReservation.jsx";
import ReservationConfirmed from "./pages/ReservationConfirmed.jsx";
import CancelReservation from "./pages/CancelReservation.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import OrderOnline from "./pages/OrderOnline.jsx";
import Checkout from "./pages/Checkout.jsx";
import ShippingAddress from "./pages/ShippingAddress.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/confirm" element={<ConfirmReservation />} />
        <Route path="/reservation/confirmed" element={<ReservationConfirmed />} />
        <Route path="/reservation/cancel" element={<CancelReservation />} />
        <Route path="/order" element={<OrderOnline />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/address" element={<ShippingAddress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
