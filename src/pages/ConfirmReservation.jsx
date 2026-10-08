import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ModalLayout from "../components/ModalLayout.jsx";
import Select from "../components/Select.jsx";
import { DetailRows } from "../components/ReservationDetail.jsx";
import { images } from "../data/images.js";
import { useReservation } from "../context/ReservationContext.jsx";

const occasions = ["Birthday", "Anniversary", "Business meal", "Date night", "Other"];
const countryCodes = ["+1", "+44", "+62", "+91"];

export function RestaurantInfo() {
  return (
    <div>
      <h2 className="text-2xl font-semibold leading-snug">Restaurant<br />informations</h2>
      <p className="mt-8 text-lg leading-8 text-ink/90">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
      <p className="mt-5 text-lg leading-8 text-ink/90">
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </p>
    </div>
  );
}

function Check({ id, checked, onChange, children, error }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-4 text-lg">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${error ? "border-danger" : "border-ink/70"} peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand`}>
        {checked && <span className="h-3 w-3 rounded-full bg-white" />}
      </span>
      <span className="leading-snug">{children}</span>
    </label>
  );
}

export default function ConfirmReservation() {
  const navigate = useNavigate();
  const { reservation, update, newBookingId } = useReservation();
  const [seconds, setSeconds] = useState(300);
  const [f, setF] = useState({ first: "", last: "", code: "+1", phone: "", email: "", occasion: "", request: "", agree: false, offers1: false, offers2: false });
  const [errors, setErrors] = useState({});
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!f.first.trim()) err.first = "Enter your first name";
    if (!f.last.trim()) err.last = "Enter your last name";
    if (!f.phone.trim()) err.phone = "Enter your phone number";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Enter a valid email address";
    if (!f.agree) err.agree = true;
    setErrors(err);
    if (Object.keys(err).length || seconds <= 0) return;
    update({ id: newBookingId(), occasion: f.occasion, request: f.request });
    navigate("/reservation/confirmed");
  };

  const input = (k, placeholder, type = "text") => (
    <div>
      <input
        type={type}
        value={f[k]}
        onChange={(e) => set(k)(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-invalid={!!errors[k]}
        className={`field ${errors[k] ? "ring-2 ring-danger" : ""}`}
      />
      {errors[k] && <p role="alert" className="mt-1 px-2 text-sm text-danger">{errors[k]}</p>}
    </div>
  );

  return (
    <ModalLayout>
      <form onSubmit={submit} noValidate className="px-6 pb-16 md:px-[60px]">
        <div className="flex flex-col items-center text-center">
          <img src={images.Reservation} alt="Set restaurant table" className="h-[210px] w-[210px] rounded-full object-cover md:h-[270px] md:w-[270px]" />
          <h2 className="mt-10 text-2xl font-semibold">Reservation detail</h2>
          <div className="mt-6"><DetailRows reservation={reservation} row /></div>
        </div>

        <div className={`mt-10 rounded-3xl px-6 py-9 text-center text-lg ${seconds > 0 ? "bg-[#CDF3FD]" : "bg-[#FFE1E1]"}`} role="timer">
          {seconds > 0 ? (
            <>Due to limited availability, we can hold this table for you for <strong>{clock} minutes</strong></>
          ) : (
            <>Your hold has expired. <button type="button" className="font-semibold underline" onClick={() => navigate("/reservation")}>Choose a new time</button></>
          )}
        </div>

        <h3 className="mt-14 px-3 text-2xl font-semibold">Data order</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {input("first", "First name")}
          {input("last", "Last name")}

          <div>
            <div className={`flex h-[60px] items-center gap-2 rounded-xl bg-cream pl-3 ${errors.phone ? "ring-2 ring-danger" : ""}`}>
              <div className="relative">
                <select aria-label="Country code" value={f.code} onChange={(e) => set("code")(e.target.value)} className="h-11 appearance-none rounded-lg bg-white pl-4 pr-9 text-sm outline-none">
                  {countryCodes.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              <input value={f.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="Phone number" aria-label="Phone number" inputMode="tel" className="h-full min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-ink/50" />
            </div>
            {errors.phone && <p role="alert" className="mt-1 px-2 text-sm text-danger">{errors.phone}</p>}
          </div>
          {input("email", "Email address", "email")}

          <Select placeholder="Select an occasion (optional)" value={f.occasion} onChange={set("occasion")} options={occasions} />
          <input value={f.request} onChange={(e) => set("request")(e.target.value)} placeholder="Add a special request" aria-label="Special request" className="field" />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <Check id="agree" checked={f.agree} onChange={set("agree")} error={errors.agree}>I agree with what is stated above</Check>
            <Check id="o1" checked={f.offers1} onChange={set("offers1")}>Sign me up to receive dining offers and news from this restaurant by email.</Check>
            <Check id="o2" checked={f.offers2} onChange={set("offers2")}>Sign me up to receive dining offers and news from this restaurant by email.</Check>
            {errors.agree && <p role="alert" className="text-sm text-danger">Agree to the terms to confirm your reservation.</p>}
            <button type="submit" disabled={seconds <= 0} className="btn-block mt-8 bg-brand text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50">Confirm reservation</button>
          </div>
          <RestaurantInfo />
        </div>
      </form>
    </ModalLayout>
  );
}
