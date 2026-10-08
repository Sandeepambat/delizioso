import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu as MenuIcon, ShoppingCart, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { useCart } from "../context/CartContext.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About us", to: "/#about" },
  { label: "Order online", to: "/order" },
  { label: "Reservation", to: "/reservation" },
  { label: "Contact us", to: "/#contact" },
];

export default function Navbar({ dim = false }) {
  const [open, setOpen] = useState(false);
  const { items } = useCart();

  return (
    <header className={`relative z-20 ${dim ? "pointer-events-none opacity-30" : ""}`}>
      <div className="page flex h-[80px] items-center justify-between md:h-[102px]">
        <Logo />

        <nav className="hidden items-center gap-10 text-sm md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => `transition-colors hover:text-brand ${isActive && !l.to.includes("#") ? "text-brand" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/order" className="relative grid h-11 w-11 place-items-center rounded-full bg-cream" aria-label={`Order list, ${items.length} items`}>
            <ShoppingCart size={18} />
            {items.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-danger text-[9px] font-semibold text-white">{items.length}</span>
            )}
          </Link>
          <Link to="/login" className="btn-leaf hidden !px-8 !py-3.5 sm:inline-flex">Log in</Link>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-cream md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="page flex flex-col gap-1 pb-4 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 hover:bg-cream">{l.label}</Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)} className="btn-leaf mt-2">Log in</Link>
        </nav>
      )}
    </header>
  );
}
