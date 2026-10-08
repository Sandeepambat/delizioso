import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, setPage, total = 3 }) {
  return (
    <nav className="mt-10 flex items-center justify-center gap-2 md:gap-3" aria-label="Pagination">
      <button onClick={() => setPage(Math.max(1, page - 1))} aria-label="Previous page" className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white md:h-12 md:w-12"><ChevronLeft /></button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button key={n} onClick={() => setPage(n)} aria-current={page === n ? "page" : undefined} className={`h-10 w-10 rounded-lg text-sm font-semibold md:h-12 md:w-12 ${page === n ? "bg-brand text-white" : "bg-brand-soft text-brand"}`}>{n}</button>
      ))}
      <span className="px-1 text-ink/60">•••</span>
      <button onClick={() => setPage(page + 1)} aria-label="Next page" className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white md:h-12 md:w-12"><ChevronRight /></button>
    </nav>
  );
}
