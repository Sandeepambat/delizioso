import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AddressPicker from "../components/AddressPicker.jsx";
import { money, useCart } from "../context/CartContext.jsx";
import { timeOptions } from "../context/ReservationContext.jsx";

const payments = ["Cash On Delivery", "BCA Virtual Account", "Credit Card", "Transfer Bank"];

function Radio({ name, checked, onChange, boxed = false, children }) {
  return (
    <label className={`flex cursor-pointer items-center gap-4 ${boxed ? "h-[70px] rounded-2xl bg-cream px-6 md:px-10" : ""}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/50 peer-checked:border-leaf peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand`}>
        {checked && <span className="h-5 w-5 rounded-full bg-leaf" />}
      </span>
      <span className="text-lg">{children}</span>
    </label>
  );
}

const Heading = ({ children }) => <h2 className="mb-6 text-xl font-medium md:text-2xl">{children}</h2>;

export default function Checkout() {
  const navigate = useNavigate();
  const { address, total, items, clear } = useCart();
  const [f, setF] = useState({ first: "", last: "", code: "+1", phone: "", email: "", note: "", when: "now", later: "", method: "delivery", payment: "Cash On Delivery", agree: true });
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!f.first.trim()) err.first = "Enter your first name";
    if (!f.last.trim()) err.last = "Enter your last name";
    if (!f.phone.trim()) err.phone = "Enter your phone number";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) err.email = "Enter a valid email address";
    if (f.when === "later" && !f.later) err.later = "Choose a time for your order";
    if (!f.agree) err.agree = "Accept the Terms of use & Privacy Policy to order";
    if (!items.length) err.items = "Your order list is empty";
    setErrors(err);
    if (Object.keys(err).length) return;
    setPlaced({ total, method: f.method, address });
    clear();
  };

  const text = (k, placeholder, type = "text") => (
    <div>
      <input type={type} value={f[k]} onChange={(e) => set(k, e.target.value)} placeholder={placeholder} aria-label={placeholder} aria-invalid={!!errors[k]} className={`field !h-[64px] md:!h-[70px] md:text-xl ${errors[k] ? "ring-2 ring-danger" : ""}`} />
      {errors[k] && <p role="alert" className="mt-1 px-2 text-sm text-danger">{errors[k]}</p>}
    </div>
  );

  if (placed) {
    return (
      <>
        <Navbar />
        <main className="page py-24 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-leaf text-white"><Check size={40} /></div>
          <h1 className="h-display mt-8 text-4xl md:text-5xl">Order placed</h1>
          <p className="mx-auto mt-4 max-w-md text-ink/80">Total {money(placed.total)} · {placed.method === "delivery" ? `delivering to ${placed.address.line}` : "ready for take away"}.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/order" className="btn-brand !px-8 !py-3.5">Order more</Link>
            <Link to="/" className="btn bg-cream !px-8 !py-3.5">Back home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <form onSubmit={submit} noValidate className="page pb-16 pt-4 md:pb-28 md:pt-8">
        <div className="relative flex items-center justify-center">
          <button type="button" onClick={() => navigate("/order")} aria-label="Back to order list" className="absolute left-0 grid h-10 w-10 place-items-center rounded-full bg-ink text-white md:h-12 md:w-12"><ChevronLeft /></button>
          <h1 className="h-display text-4xl md:text-6xl">Checkout</h1>
        </div>

        {/* Desktop: address summary with Change */}
        <section className="mt-14 hidden md:block">
          <Heading>Shipping address</Heading>
          <div className="flex gap-6">
            <p className="flex min-h-[76px] flex-1 items-center rounded-2xl bg-cream px-14 text-xl">{address.line}</p>
            <Link to="/checkout/address" className="grid w-[151px] place-items-center rounded-2xl bg-[#7AA2E3] text-xl text-white hover:bg-[#6B94D8]">Change</Link>
          </div>
        </section>

        <section className="mt-10 md:mt-16">
          <h2 className="mb-6 px-2 text-xl font-medium md:text-2xl">Order data</h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {text("first", "First name")}
            {text("last", "Last name")}
            <div>
              <div className={`flex h-[64px] items-center gap-2 rounded-xl bg-cream pl-3 md:h-[70px] ${errors.phone ? "ring-2 ring-danger" : ""}`}>
                <div className="relative">
                  <select aria-label="Country code" value={f.code} onChange={(e) => set("code", e.target.value)} className="h-11 appearance-none rounded-lg bg-white pl-4 pr-9 text-sm outline-none">
                    {["+1", "+44", "+62", "+91"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <input value={f.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" placeholder="Phone number" aria-label="Phone number" className="h-full min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-ink/50 md:text-xl" />
              </div>
              {errors.phone && <p role="alert" className="mt-1 px-2 text-sm text-danger">{errors.phone}</p>}
            </div>
            {text("email", "Email address", "email")}
            <textarea value={f.note} onChange={(e) => set("note", e.target.value)} placeholder="Note" aria-label="Note" className="h-[170px] w-full resize-none rounded-2xl bg-cream p-6 outline-none ring-brand/60 placeholder:text-ink/50 focus:ring-2 md:col-span-2 md:h-[200px] md:text-xl" />
          </div>
        </section>

        <section className="mt-12 md:mt-20">
          <Heading>Order time</Heading>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
            <Radio name="when" checked={f.when === "now"} onChange={() => set("when", "now")}>Order now</Radio>
            <Radio name="when" checked={f.when === "later"} onChange={() => set("when", "later")}>
              <span className="inline-flex items-center gap-3">Order later <ChevronDown size={18} /></span>
            </Radio>
          </div>
          {f.when === "later" && (
            <div className="mt-4 max-w-xs">
              <select aria-label="Order time" value={f.later} onChange={(e) => set("later", e.target.value)} className="field !h-14 text-base">
                <option value="" disabled>Select a time</option>
                {timeOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.later && <p role="alert" className="mt-1 text-sm text-danger">{errors.later}</p>}
            </div>
          )}
        </section>

        <section className="mt-12">
          <Heading>Order method</Heading>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <Radio name="method" checked={f.method === "delivery"} onChange={() => set("method", "delivery")}>Delivery</Radio>
            <Radio name="method" checked={f.method === "takeaway"} onChange={() => set("method", "takeaway")}>Take a way</Radio>
          </div>
        </section>

        <section className="mt-12">
          <Heading>Payment method</Heading>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {payments.map((p) => (
              <Radio key={p} boxed name="payment" checked={f.payment === p} onChange={() => set("payment", p)}>{p}</Radio>
            ))}
          </div>
        </section>

        {/* Mobile: shipping address picker sits at the bottom */}
        <section className="mt-12 md:hidden">
          <Heading>Shipping address</Heading>
          <p className="mb-4 rounded-xl bg-cream px-4 py-3 text-sm">{address.line}</p>
          <AddressPicker variant="inline" />
        </section>

        <div className="mt-12 md:mt-16">
          <label className="flex cursor-pointer items-start gap-4 text-base md:items-center md:text-2xl">
            <input type="checkbox" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} className="peer sr-only" />
            <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand md:mt-0">
              {f.agree ? <Check size={20} /> : <span className="h-5 w-5 rounded-sm bg-white" />}
            </span>
            Choose to indicate that you have read and agree to our Terms of use &amp; Privacy Policy.
          </label>
          {errors.agree && <p role="alert" className="mt-2 text-sm text-danger">{errors.agree}</p>}
          {errors.items && <p role="alert" className="mt-2 text-sm text-danger">{errors.items}. <Link to="/order" className="underline">Add dishes</Link></p>}
        </div>

        <button type="submit" className="btn-block mx-auto mt-12 bg-brand text-white hover:bg-brand-dark md:!w-[382px]">Order now</button>
      </form>
      <Footer />
    </>
  );
}
