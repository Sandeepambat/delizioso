/** Dummy map artwork (no API key needed). Replace with Google Maps / Leaflet later. */
export default function MapPlaceholder() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map showing the selected address">
      <rect width="800" height="500" fill="#E3E5E8" />
      <path d="M0 0h140c20 90 10 180-30 260S60 440 80 500H0z" fill="#AFC3EE" />
      <path d="M640 120c60 20 120 10 160 40v200c-60 40-110 30-150-10s-40-130-10-230z" fill="#AFC3EE" />
      <g fill="#C8E2BE">
        <ellipse cx="190" cy="330" rx="70" ry="45" />
        <ellipse cx="520" cy="110" rx="80" ry="40" />
        <ellipse cx="610" cy="330" rx="60" ry="50" />
        <ellipse cx="300" cy="440" rx="90" ry="35" />
        <ellipse cx="260" cy="90" rx="55" ry="30" />
      </g>
      <g stroke="#F6D88E" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M120 40c120 60 200 140 260 230s130 150 200 230" />
        <path d="M0 260c140-20 300 20 420 70s240 40 380-30" />
        <path d="M300 0c10 120 50 220 100 300" />
      </g>
      <g stroke="#FFFFFF" strokeWidth="3" fill="none">
        <path d="M0 150h800M0 380h800M200 0v500M520 0v500M680 0v500" />
      </g>
    </svg>
  );
}
