import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, CheckSquare, SquarePen, X } from "lucide-react";
import ModalLayout, { Banner } from "../components/ModalLayout.jsx";
import Select from "../components/Select.jsx";
import { DetailRows, RingedPhoto } from "../components/ReservationDetail.jsx";
import { RestaurantInfo } from "./ConfirmReservation.jsx";
import { useReservation } from "../context/ReservationContext.jsx";

export default function ReservationConfirmed() {
  const navigate = useNavigate();
  const { reservation, update } = useReservation();
  const [occasion, setOccasion] = useState(reservation.occasion || "");
  const [request, setRequest] = useState(reservation.request || "");

  return (
    <ModalLayout closeTo="/">
      <Banner tone="success" title="Reservation has been confirmed">
        <p className="flex items-center gap-3 text-lg md:text-xl"><CheckSquare size={22} className="shrink-0" /> The confirmation result has been sent to your email</p>
        <p className="flex items-center gap-3 text-lg md:text-xl"><CalendarDays size={22} className="shrink-0" /> Booking ID : {reservation.id}</p>
      </Banner>

      <div className="px-6 pb-20 pt-14 md:px-[60px]">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
          <RingedPhoto />
          <div className="flex-1 self-stretch md:py-12">
            <h2 className="mb-8 text-2xl font-semibold">Reservation detail</h2>
            <DetailRows reservation={reservation} />
          </div>
          <div className="flex w-full flex-col gap-5 md:w-[246px]">
            <button onClick={() => navigate("/reservation")} className="flex h-20 items-center justify-center gap-4 rounded-2xl bg-[#CFE2FF] text-lg text-[#1E3A8A] transition-colors hover:bg-[#BBD5FF]">
              Modify <SquarePen size={28} />
            </button>
            <button onClick={() => navigate("/reservation/cancel")} className="flex h-20 items-center justify-center gap-4 rounded-2xl bg-[#FFE1E3] text-lg text-[#E11D2E] transition-colors hover:bg-[#FFD0D4]">
              Cancel <X size={28} />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <Select placeholder="Select an occasion (optional)" value={occasion} onChange={(v) => { setOccasion(v); update({ occasion: v }); }} options={["Birthday", "Anniversary", "Business meal", "Date night", "Other"]} />
            <textarea
              value={request}
              onChange={(e) => { setRequest(e.target.value); update({ request: e.target.value }); }}
              placeholder="Add a special request"
              aria-label="Special request"
              className="h-[360px] w-full resize-none rounded-2xl bg-cream p-6 outline-none ring-brand/60 placeholder:text-ink/50 focus:ring-2"
            />
          </div>
          <RestaurantInfo />
        </div>
      </div>
    </ModalLayout>
  );
}
