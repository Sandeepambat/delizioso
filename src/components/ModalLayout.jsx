import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Logo from "./Logo.jsx";
import { images } from "../data/images.js";

/** Dimmed page with a white "modal" sheet — shared by confirm / confirmed / cancel screens. */
export default function ModalLayout({ children, closeTo = "/reservation" }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-mocha pb-24">
        <img src={images.reservationCircle} alt="" aria-hidden className="absolute -left-48 top-96 hidden h-[500px] w-[500px] rounded-full object-cover opacity-40 lg:block" />
        <Navbar dim />
        <button
          onClick={() => navigate(closeTo)}
          aria-label="Close"
          className="absolute left-1/2 top-[60px] z-30 grid h-14 w-14 md:top-[78px] md:h-20 md:w-20 -translate-x-1/2 place-items-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
        >
          <X className="h-6 w-6 md:h-9 md:w-9" strokeWidth={1.5} />
        </button>

        <section className="page relative z-10 mt-[60px] md:mt-[85px] !max-w-[1112px] bg-white !px-0">
          <div className="flex items-center justify-between px-5 pb-10 pt-8 md:px-[60px] md:pb-14 md:pt-[60px]">
            <Logo />
            <div className="flex gap-4">
              <Link to="/login" className="btn-brand !px-4 !py-2 text-xs sm:!px-7 sm:!py-3 sm:text-sm">Sign in</Link>
              <Link to="/signup" className="btn-leaf !px-4 !py-2 text-xs sm:!px-7 sm:!py-3 sm:text-sm">Sign up</Link>
            </div>
          </div>
          {children}
        </section>
      </div>
      <Footer />
    </div>
  );
}

/** Coloured banner with decorative bubbles. */
export function Banner({ tone = "brand", title, children }) {
  const bg = tone === "success" ? "bg-[#40C46C]" : "bg-brand";
  return (
    <div className={`relative overflow-hidden px-6 py-10 text-white md:px-[64px] ${bg}`}>
      <span className="absolute -top-4 left-6 h-16 w-16 rounded-full bg-white/15" />
      <span className="absolute right-[18%] top-6 h-28 w-28 rounded-full bg-white/10" />
      <span className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10" />
      <span className="absolute -bottom-3 right-10 h-16 w-16 rounded-full bg-white/10" />
      <h1 className="relative max-w-[700px] text-3xl font-semibold leading-tight md:text-[40px]">{title}</h1>
      <div className="relative mt-4 space-y-2 text-xl">{children}</div>
    </div>
  );
}
