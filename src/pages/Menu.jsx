import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import MenuCard from "../components/MenuCard.jsx";
import { categories, menuItems } from "../data/menu.js";

export default function Menu() {
  const navigate = useNavigate();
  const { add } = useCart();
  const [active, setActive] = useState("All category");
  const [pageNo, setPageNo] = useState(1);
  const items = active === "All category" ? menuItems : menuItems.filter((i) => i.category === active);

  return (
    <>
      <Navbar />
      <main className="page pb-24 pt-10 md:pb-40 md:pt-20">
        <h1 className="h-display text-center text-5xl md:text-7xl">Menu</h1>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-2 md:mt-20 md:grid md:grid-cols-5 md:gap-6" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`h-[66px] shrink-0 rounded-full px-8 text-xl font-medium transition-colors md:px-0 ${
                active === c ? "bg-ink text-white" : "bg-cream hover:bg-brand-soft"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => <MenuCard key={item.id} item={item} onOrder={(i) => { add({ id: i.name.toLowerCase().replace(/\s+/g, "-"), name: i.name, price: i.price }); navigate("/order"); }} />)}
        </div>
        {items.length === 0 && <p className="mt-12 text-center text-ink/60">No dishes in this category yet.</p>}

        <nav className="mt-16 flex items-center justify-center gap-3" aria-label="Pagination">
          <button onClick={() => setPageNo((p) => Math.max(1, p - 1))} aria-label="Previous page" className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-white"><ChevronLeft /></button>
          {[1, 2, 3].map((n) => (
            <button key={n} onClick={() => setPageNo(n)} aria-current={pageNo === n} className={`h-12 w-12 rounded-lg text-sm font-semibold ${pageNo === n ? "bg-brand text-white" : "bg-brand-soft text-brand"}`}>{n}</button>
          ))}
          <span className="px-2 text-ink/60">•••</span>
          <button onClick={() => setPageNo((p) => p + 1)} aria-label="Next page" className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-white"><ChevronRight /></button>
        </nav>
      </main>
      <Footer />
    </>
  );
}
