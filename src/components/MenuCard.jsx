import { Plus, Star } from "lucide-react";
import { images } from "../data/images";

const onImgError = (e) => {
  if (e.currentTarget.src !== images.fallback) e.currentTarget.src = images.fallback;
};

export function Stars({ value, size = 16 }) {
  return (
    <div className="flex justify-center gap-2" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= value ? "fill-brand text-brand" : "fill-brand/15 text-transparent"}
        />
      ))}
    </div>
  );
}

/** Desktop card: price + "Order now". Compact card (mobile home): price + round "+" button. */
export default function MenuCard({ item, compact = false, onOrder }) {
  if (compact) {
    return (
      <article className="rounded-3xl bg-cream p-3 text-center">
        <img
          src={item.image}
          alt={item.name}
          onError={onImgError}
          loading="lazy"
          className="mx-auto aspect-square w-full rounded-full object-cover"
        />
        <h3 className="mt-3 text-sm font-semibold">{item.name}</h3>
        <div className="mt-1 scale-75"><Stars value={item.rating} size={14} /></div>
        <p className="line-clamp-2 text-[10px] leading-4 text-ink/70">{item.blurb}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onOrder?.(item)}
            className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"
            aria-label={`Add ${item.name}`}
          >
            <Plus size={14} />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[40px] bg-cream p-6 text-center sm:p-8">
      <img
        src={item.image}
        alt={item.name}
        onError={onImgError}
        loading="lazy"
        className="mx-auto aspect-square w-full max-w-[240px] rounded-full object-cover shadow-sm"
      />
      <h3 className="mt-8 text-2xl font-semibold">{item.name}</h3>
      <div className="mt-3"><Stars value={item.rating} /></div>
      <p className="mt-4 text-xs leading-6 text-ink/80">{item.blurb}</p>
      <div className="mt-6 flex items-center justify-center gap-6">
        <span className="text-xl font-semibold">${item.price.toFixed(2)}</span>
        <button onClick={() => onOrder?.(item)} className="btn-brand !px-7 !py-3">Order now</button>
      </div>
    </article>
  );
}