import { createContext, useContext, useState } from "react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const formatDate = (d) => `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
export const formatParty = (n) => `${n} ${Number(n) === 1 ? "person" : "people"} (Standard seating)`;

export const dateOptions = (count = 14) =>
  Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return formatDate(d);
  });

export const timeOptions = ["12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm", "04:30 pm", "05:00 pm", "06:30 pm", "07:00 pm", "08:00 pm"];
export const partyOptions = Array.from({ length: 10 }, (_, i) => i + 1);

const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  // Defaults mirror the design so each screen can be opened directly.
  const [reservation, setReservation] = useState({
    date: "Saturday, 28 February 2022",
    time: "04:30 pm",
    party: 2,
    id: "#123456",
    occasion: "",
    request: "",
  });
  const update = (patch) => setReservation((r) => ({ ...r, ...patch }));
  const newBookingId = () => `#${Math.floor(100000 + Math.random() * 900000)}`;
  return (
    <ReservationContext.Provider value={{ reservation, update, newBookingId }}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => useContext(ReservationContext);
