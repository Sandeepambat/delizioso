import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Select from "../components/Select.jsx";
import { images } from "../data/images.js";
import { dateOptions, partyOptions, timeOptions, useReservation } from "../context/ReservationContext.jsx";

export default function Reservation() {
  const navigate = useNavigate();
  const { update } = useReservation();
  const dates = useMemo(() => dateOptions(), []);
  const [form, setForm] = useState({ date: "", time: "", party: "" });
  const [error, setError] = useState("");
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.party) {
      return setError("Choose a date, time and party size to continue.");
    }
    setError("");
    update({ date: form.date, time: form.time, party: Number(form.party) });
    navigate("/reservation/confirm");
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden pb-16 md:pb-28">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:mt-12 md:grid-cols-2">
          {/* Photo with rounded backdrop */}
          <div className="relative -ml-24 flex h-[320px] items-center md:ml-0 md:h-[620px]">
            <div className="absolute inset-y-0 left-0 w-[88%] rounded-r-[400px] bg-cream" />
            <div className="absolute inset-y-[10%] left-0 w-[80%] rounded-r-[400px] bg-[#F2F1EF]" />
            <img
              src={images.Reservation}
              alt="Elegantly set restaurant table"
              className="relative ml-24 h-[240px] w-[240px] rounded-full object-cover md:ml-10 md:h-[525px] md:w-[525px]"
            />
          </div>

          <form onSubmit={submit} className="px-5 md:px-0 md:pr-6 lg:pr-[164px]" noValidate>
            <h1 className="h-display text-5xl md:text-7xl">Book a table</h1>
            <div className="mt-10 space-y-5">
              <Select placeholder="Date" value={form.date} onChange={set("date")} options={dates} />
              <Select placeholder="Time" value={form.time} onChange={set("time")} options={timeOptions} />
              <Select
                placeholder="Party size"
                value={form.party}
                onChange={set("party")}
                options={partyOptions.map((n) => ({ value: n, label: `${n} ${n === 1 ? "person" : "people"}` }))}
              />
              {error && <p role="alert" className="text-sm text-danger">{error}</p>}
              <button type="submit" className="btn-block bg-brand text-white hover:bg-brand-dark">Book now</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}