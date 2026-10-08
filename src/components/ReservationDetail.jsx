import { Calendar, Clock, User } from "lucide-react";
import { images } from "../data/images.js";
import { formatParty } from "../context/ReservationContext.jsx";

export function DetailRows({ reservation, row = false }) {
  const items = [
    [Calendar, reservation.date],
    [Clock, reservation.time],
    [User, formatParty(reservation.party)],
  ];
  return (
    <ul className={row ? "flex flex-wrap justify-center gap-x-10 gap-y-4" : "space-y-4"}>
      {items.map(([Icon, text], i) => (
        <li key={i} className="flex items-center gap-4 text-lg text-ink/90">
          <Icon size={28} strokeWidth={1.5} />
          {text}
        </li>
      ))}
    </ul>
  );
}

/** Circular photo with soft concentric rings (cancel / confirmed screens). */
export function RingedPhoto() {
  return (
    <div className="grid h-[250px] w-[250px] shrink-0 place-items-center rounded-full bg-[#FAF6F1] md:h-[330px] md:w-[330px]">
      <div className="grid h-[200px] w-[200px] place-items-center rounded-full bg-[#F4ECE3] md:h-[266px] md:w-[266px]">
        <img src={images.Reservation} alt="Set restaurant table" className="h-[150px] w-[150px] rounded-full object-cover md:h-[210px] md:w-[210px]" />
      </div>
    </div>
  );
}
