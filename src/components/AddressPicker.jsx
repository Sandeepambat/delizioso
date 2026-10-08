import { useState } from "react";
import { Navigation } from "lucide-react";
import MapPlaceholder from "./MapPlaceholder.jsx";
import { img } from "../data/images.js";
import { useCart } from "../context/CartContext.jsx";

/**
 * variant="modal"  -> map bleeds to the edges of the sheet (desktop address modal)
 * variant="inline" -> rounded map inside the checkout page (mobile)
 */
export default function AddressPicker({ variant = "inline", onConfirm }) {
  const { address, setAddress } = useCart();
  const [query, setQuery] = useState("");
  const [candidate, setCandidate] = useState(address);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const search = () => {
    if (!query.trim()) return setNote("Type an address to search.");
    setNote("");
    setSaved(false);
    setCandidate({ title: "Searched address", line: query.trim(), coords: "40.885147,-73.9220459" });
  };

  const locate = () => {
    if (!navigator.geolocation) return setNote("Location isn't available in this browser. Type your address instead.");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setNote("");
        setSaved(false);
        setCandidate({ title: "Current location", line: "Detected near you", coords: `${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}` });
      },
      () => setNote("We couldn't get your location. Allow location access or type your address."),
    );
  };

  const confirm = () => {
    setAddress(candidate);
    setSaved(true);
    onConfirm?.(candidate);
  };

  const bleed = variant === "modal";

  return (
    <div>
      <div className={bleed ? "px-5 md:px-[60px]" : ""}>
        <div className="flex gap-3 md:gap-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), search())}
            placeholder="Please type your address"
            aria-label="Address"
            className="field !h-14 min-w-0 flex-1 md:!h-[68px] md:text-xl"
          />
          <button type="button" onClick={search} className="h-14 w-24 shrink-0 rounded-xl bg-[#54A5E0] text-base font-semibold text-white hover:bg-[#4695D0] md:h-[68px] md:w-[146px] md:text-xl">Search</button>
        </div>
        <button type="button" onClick={locate} className="mt-4 flex h-14 w-full items-center gap-5 rounded-xl bg-cream px-6 text-left text-base text-danger md:h-[68px] md:max-w-[calc(100%-170px)] md:px-9 md:text-xl">
          <Navigation size={24} fill="currentColor" /> Use your current location
        </button>
        {note && <p role="alert" className="mt-3 text-sm text-danger">{note}</p>}
      </div>

      <div className={`relative mt-8 h-[420px] overflow-hidden md:h-[500px] ${bleed ? "" : "rounded-2xl"}`}>
        <MapPlaceholder />
        <svg className="absolute left-[46%] top-[68%] -translate-x-1/2 -translate-y-full" width="34" height="46" viewBox="0 0 34 46" aria-hidden>
          <path d="M17 0C7.6 0 0 7.6 0 17c0 12.5 17 29 17 29s17-16.5 17-29C34 7.6 26.4 0 17 0z" fill="#EF5350" />
          <circle cx="17" cy="17" r="6.5" fill="#fff" />
        </svg>

        <div className="absolute left-1/2 top-[8%] w-[92%] max-w-[560px] -translate-x-1/2 rounded-3xl bg-white/75 p-3 shadow-lg backdrop-blur-md md:top-[12%] md:p-4">
          <div className="flex gap-4">
            <img src={img("highbridge-house", 300, 360)} alt={candidate.title} className="h-36 w-28 shrink-0 rounded-2xl object-cover md:h-44 md:w-36" />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold md:text-xl">{candidate.title}</h3>
              <p className="mt-1 text-sm leading-5 md:text-base">{candidate.line}</p>
              <p className="mt-2 text-xs md:text-sm">{candidate.coords}</p>
              <button type="button" onClick={confirm} className="mt-3 h-11 w-full rounded-xl bg-danger text-sm font-semibold text-white hover:bg-red-600 md:h-12 md:text-base">Confirmation</button>
            </div>
          </div>
          {saved && <p role="status" className="mt-2 text-center text-xs text-ink/70">Shipping address saved.</p>}
        </div>
      </div>
    </div>
  );
}
