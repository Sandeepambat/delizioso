import { Link } from "react-router-dom";

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-4" aria-label="Delizioso home">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-lg font-bold text-white md:h-[51px] md:w-[51px] md:text-2xl">
        D
      </span>
      <span className={`text-xs font-semibold ${light ? "text-white" : "text-ink"}`}>
        Delizi<span className="text-brand">oso</span>
      </span>
    </Link>
  );
}
