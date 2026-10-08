import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import ModalLayout, { Banner } from "../components/ModalLayout.jsx";
import { DetailRows, RingedPhoto } from "../components/ReservationDetail.jsx";
import { useReservation } from "../context/ReservationContext.jsx";

export default function CancelReservation() {
  const navigate = useNavigate();
  const { reservation } = useReservation();

  return (
    <ModalLayout closeTo="/reservation/confirmed">
      <Banner title="Are you sure you want to cancel the reservation?">
        <p className="flex items-center gap-3 text-lg md:text-xl"><CalendarDays size={22} className="shrink-0" /> Booking ID : {reservation.id}</p>
      </Banner>

      <div className="px-6 pb-20 pt-14 md:px-[60px]">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <RingedPhoto />
          <div className="flex-1 md:py-6">
            <h2 className="mb-8 text-2xl font-semibold">Reservation detail</h2>
            <DetailRows reservation={reservation} />
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button onClick={() => navigate("/reservation")} className="btn-block bg-danger text-white hover:bg-red-600 md:!w-[458px]">
            Cancel reservation
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
