import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { money, useCart } from "../context/CartContext.jsx";

export default function OrderList({ onCheckout }) {
  const { items, setQty, remove, subtotal, tax, discount, total, voucher, applyVoucher } = useCart();
  const [code, setCode] = useState(voucher.code);
  const [msg, setMsg] = useState("");

  const apply = () => setMsg(applyVoucher(code) ? "Voucher applied." : "That voucher code isn't valid.");

  return (
    <aside className="rounded-3xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" aria-label="Order list">
      <h2 className="rounded-2xl bg-[#6B3FA0] py-4 text-center text-2xl font-semibold text-white">Order list</h2>

      <ul className="mt-6 space-y-6 px-2">
        {items.length === 0 && <li className="py-6 text-center text-sm text-ink/60">Your order list is empty. Pick a dish to start.</li>}
        {items.map((i) => (
          <li key={i.id}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{i.name}</h3>
              <button onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`} className="text-danger/80 hover:text-danger"><Trash2 size={16} /></button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3 rounded-full bg-cream px-2 py-1 shadow-sm">
                <button onClick={() => setQty(i.id, i.qty - 1)} aria-label={`Decrease ${i.name}`} className="grid h-6 w-6 place-items-center rounded-full text-danger"><Minus size={13} /></button>
                <span className="min-w-4 text-center text-sm" aria-live="polite">{i.qty}</span>
                <button onClick={() => setQty(i.id, i.qty + 1)} aria-label={`Increase ${i.name}`} className="grid h-6 w-6 place-items-center rounded-full text-leaf"><Plus size={13} /></button>
              </div>
              <span className="text-xl font-semibold text-brand">{money(i.price * i.qty)}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-dashed border-ink/20 px-2 pt-6">
        <h3 className="text-lg font-semibold">Voucher Code</h3>
        <div className="mt-3 flex gap-3">
          <input value={code} onChange={(e) => setCode(e.target.value)} aria-label="Voucher code" className="h-12 min-w-0 flex-1 rounded-xl bg-cream px-4 text-sm tracking-wide text-sky-700 outline-none ring-brand/60 focus:ring-2" />
          <button onClick={apply} aria-label="Apply voucher" className="grid h-12 w-12 place-items-center rounded-xl bg-[#54A5E0] text-white"><Plus /></button>
        </div>
        {msg && <p role="status" className="mt-2 text-xs text-ink/70">{msg}</p>}
      </div>

      <dl className="mt-6 space-y-3 border-t border-dashed border-ink/20 px-2 pt-6 text-lg">
        {[["Subtotal", subtotal], ["Tax fee", tax], ["Voucher", discount]].map(([k, v]) => (
          <div key={k} className="flex justify-between"><dt className="font-semibold">{k}</dt><dd className="font-semibold text-brand">{money(v)}</dd></div>
        ))}
        <div className="flex justify-between"><dt className="font-semibold">Total</dt><dd className="font-semibold text-brand">{money(total)}</dd></div>
      </dl>

      <button disabled={!items.length} onClick={onCheckout} className="mt-8 h-14 w-full rounded-xl bg-[#3DC878] text-xl font-semibold text-white transition-colors hover:bg-[#33B56A] disabled:cursor-not-allowed disabled:opacity-50">
        Checkout
      </button>
    </aside>
  );
}
