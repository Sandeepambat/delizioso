import { useNavigate } from "react-router-dom";
import ModalLayout from "../components/ModalLayout.jsx";
import AddressPicker from "../components/AddressPicker.jsx";

export default function ShippingAddress() {
  const navigate = useNavigate();
  return (
    <ModalLayout closeTo="/checkout">
      <h2 className="px-5 pb-8 text-2xl font-medium md:px-[60px]">Shipping address</h2>
      <AddressPicker variant="modal" onConfirm={() => navigate("/checkout")} />
    </ModalLayout>
  );
}
