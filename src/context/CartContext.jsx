import { createContext, useContext, useMemo, useState } from "react";

/** Shows 24.1 / 5.0 / 12.05 – matches the one-decimal figures in the design. */
export const money = (n) => {
  const v = Number(Number(n).toFixed(2));
  return `$${Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? v.toFixed(1) : v.toFixed(2)}`;
};

const VOUCHERS = { FREETOEAT: 5 };
const TAX = 3.5;

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Seeded with the items shown in the design.
  const [items, setItems] = useState([
    { id: "spaghetti", name: "Spaghetti", price: 12.05, qty: 2 },
    { id: "pizza", name: "Pizza", price: 17.85, qty: 2 },
    { id: "caesar-salad", name: "Caesar salad", price: 9.25, qty: 2 },
  ]);
  const [voucher, setVoucher] = useState({ code: "FREETOEAT", applied: true });
  const [address, setAddress] = useState({
    title: "Highbridge House",
    line: "1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat",
    coords: "40.885147,-73.9220459",
  });

  const add = (item) =>
    setItems((list) =>
      list.some((i) => i.id === item.id)
        ? list.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...list, { ...item, qty: 1 }]
    );
  const setQty = (id, qty) => setItems((list) => list.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const remove = (id) => setItems((list) => list.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const applyVoucher = (code) => {
    const ok = code.trim().toUpperCase() in VOUCHERS;
    setVoucher({ code, applied: ok });
    return ok;
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = items.length ? TAX : 0;
    const discount = voucher.applied && items.length ? Math.min(VOUCHERS[voucher.code.trim().toUpperCase()] ?? 0, subtotal) : 0;
    return { subtotal, tax, discount, total: subtotal + tax - discount };
  }, [items, voucher]);

  return (
    <CartContext.Provider value={{ items, add, setQty, remove, clear, voucher, applyVoucher, address, setAddress, ...totals }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
