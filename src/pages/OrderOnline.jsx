import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, X } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import OrderList from "../components/OrderList.jsx";
import Pagination from "../components/Pagination.jsx";
import { categories } from "../data/menu.js";
import { orderSections } from "../data/orderMenu.js";
import { money, useCart } from "../context/CartContext.jsx";

function OrderCard({ item, active, onOrder }) {
  return (
    <article className={`rounded-[28px] p-3 text-center transition-colors sm:p-4 ${active ? "bg-brand text-white" : "bg-cream"}`}>
      <img src={item.image} alt={item.name} className="mx-auto aspect-square w-full max-w-[160px] rounded-full object-cover shadow-sm" loading="lazy" />
      <h3 className="mt-3 text-sm font-semibold sm:text-base">{item.name}</h3>
      <div className="mt-1 flex justify-center gap-1" role="img" aria-label={`${item.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={10} className={n <= item.rating ? (active ? "fill-ink text-ink" : "fill-brand text-brand") : "fill-white/40 text-transparent"} />
        ))}
      </div>
      <p className={`mt-2 hidden text-[10px] leading-4 sm:block ${active ? "text-white/90" : "text-ink/70"}`}>{item.blurb}</p>
      <div className="mt-3 flex items-center justify-between gap-1">
        <span className="text-xs font-semibold sm:text-sm">${item.price.toFixed(2)}</span>
        <button onClick={() => onOrder(item)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold sm:px-4 sm:text-xs ${active ? "bg-white text-brand" : "bg-brand text-white"}`}>Order now</button>
      </div>
    </article>
  );
}

function Section({ section, selected, onOrder }) {
  const [page, setPage] = useState(1);
  return (
    <section className="mb-14">
      <h2 className="inline-block border-b-2 border-brand pb-2 text-lg font-semibold uppercase tracking-wide md:text-xl">{section.title}</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {section.items.map((item, i) => (
          <OrderCard key={item.id} item={item} active={selected ? selected === item.id : i === 0} onOrder={onOrder} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </section>
  );
}

export default function OrderOnline() {
  const navigate = useNavigate();
  const { add, items, total } = useCart();
  const [cat, setCat] = useState("Dinner");
  const [selected, setSelected] = useState({});
  const [sheet, setSheet] = useState(false);

  const visible = orderSections.filter((s) => cat === "All category" || s.categories.includes(cat));

  const order = (section) => (item) => {
    setSelected((s) => ({ ...s, [section.title]: item.id }));
    add({ id: item.id, name: item.name, price: item.price });
  };

  return (
    <>
      <Navbar />
      <main className="page pb-28 pt-6 lg:pb-24 md:pt-16">
        <h1 className="h-display text-center text-5xl md:text-7xl">Menu</h1>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 md:mt-16 md:grid md:grid-cols-5 md:gap-6" role="tablist">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`h-12 shrink-0 rounded-full px-6 text-sm transition-colors md:h-[66px] md:px-0 md:text-xl ${cat === c ? "bg-black text-white" : "bg-cream hover:bg-brand-soft"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
          <div>
            {visible.map((s) => <Section key={s.title} section={s} selected={selected[s.title]} onOrder={order(s)} />)}
            {visible.length === 0 && <p className="py-16 text-center text-ink/60">Nothing in {cat.toLowerCase()} yet. Try Dinner or Lunch.</p>}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-6"><OrderList onCheckout={() => navigate("/checkout")} /></div>
          </div>
        </div>
      </main>

      {/* Mobile: order bar + bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-40 p-4 lg:hidden">
        <button onClick={() => setSheet(true)} className="flex w-full items-center justify-between rounded-full bg-brand px-6 py-4 font-semibold text-white shadow-lg">
          <span>{items.length} {items.length === 1 ? "dish" : "dishes"}</span>
          <span>View order list · {money(total)}</span>
        </button>
      </div>
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Order list">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-white p-3">
            <button onClick={() => setSheet(false)} aria-label="Close order list" className="ml-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-cream"><X size={18} /></button>
            <OrderList onCheckout={() => navigate("/checkout")} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
