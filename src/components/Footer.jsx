import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo.jsx";

const pages = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Order online", "/menu"],
  ["Catering", "/"],
  ["Reservation", "/reservation"],
];
const info = [["About us", "/"], ["Testimonial", "/"], ["Event", "/"]];

export default function Footer() {
  return (
    <footer id="contact" className="bg-espresso text-white">
      <div className="page grid gap-10 pb-12 pt-16 md:grid-cols-[1.4fr_.7fr_.7fr_1.1fr] md:pt-[150px]">
        <div>
          <Logo light />
          <p className="mt-8 max-w-[320px] text-lg leading-10">Viverra gravida morbi egestas facilisis tortor netus non duis tempor.</p>
          <div className="mt-6 flex gap-4">
            {[Twitter, Instagram, Facebook].map((Icon, i) => (
              <a key={i} href="#" aria-label={Icon.displayName || "social"} className="grid h-[60px] w-[60px] place-items-center rounded-full bg-white text-black">
                <Icon size={26} fill="currentColor" strokeWidth={Icon === Instagram ? 2 : 0} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-semibold text-brand">Page</h4>
          <ul className="mt-6 space-y-5 text-lg">
            {pages.map(([t, to]) => (
              <li key={t}><Link to={to} className="hover:text-brand">{t}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-2xl font-semibold text-brand">Information</h4>
          <ul className="mt-6 space-y-5 text-lg">
            {info.map(([t, to]) => (
              <li key={t}><Link to={to} className="hover:text-brand">{t}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-2xl font-semibold text-brand">Get in touch</h4>
          <address className="mt-6 space-y-6 text-lg not-italic">
            <p>3247 Johnson Ave, Bronx, NY 10463, Amerika Serikat</p>
            <p>delizioso@gmail.com</p>
            <p>+123 4567 8901</p>
          </address>
        </div>
      </div>
      <p className="pb-12 pt-6 text-center text-lg md:pt-16">Copyright © 2022 Delizioso</p>
    </footer>
  );
}
