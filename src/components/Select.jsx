import { ChevronDown } from "lucide-react";

export default function Select({ placeholder, value, onChange, options, label, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        aria-label={label || placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`field appearance-none pr-14 ${value ? "" : "text-ink/50"}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-ink/70" size={22} />
    </div>
  );
}
