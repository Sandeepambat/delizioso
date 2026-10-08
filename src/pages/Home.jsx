import { useState } from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import MenuCard from "../components/MenuCard.jsx";
import { categories, menuItems } from "../data/menu.js";
import { images } from "../data/images.js";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend proin. Congue nibh nulla malesuada ultricies nec quam.";

const chefs = [
  { name: "Betran Komar", role: "Head chef" },
  { name: "Ferry Sauwi", role: "Chef" },
  { name: "Ferry Sauwi", role: "Chef" },
  { name: "Iswan Dracho", role: "Chef" },
];

const testimonials = [
  { name: "Starla Virgoun", role: "Financial advisor", text: lorem },
  { name: "Daniel Reyes", role: "Architect", text: lorem },
  { name: "Maya Okafor", role: "Teacher", text: lorem },
  { name: "Luca Bianchi", role: "Photographer", text: lorem },
  { name: "Priya Nair", role: "Designer", text: lorem },
];

export default function Home() {
  const [cat, setCat] = useState("All category");
  const [t, setT] = useState(2);
  const popular = (
    cat === "All category" ? menuItems : menuItems.filter((i) => i.category === cat)
  ).slice(0, 4);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="page grid items-center gap-8 pb-16 pt-6 md:grid-cols-2 md:pb-28 md:pt-12">
          <div>
            <span className="inline-block rounded-full bg-brand-soft px-4 py-1 text-xs text-brand">Delizioso</span>
            <h1 className="h-display mt-5 text-5xl leading-tight md:text-7xl">Italian<br />Cuisine</h1>
            <p className="mt-5 max-w-[420px] text-sm leading-6 text-ink/80 md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales senectus dictum arcu sit tristique donec eget.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/menu" className="btn-brand !px-8 !py-3.5">Order now</Link>
              <Link to="/reservation" className="btn-leaf !px-8 !py-3.5">Reservation</Link>
            </div>
          </div>
          <img
            src={images.hero}
            alt="Plate of paneer noodles"
            className="mx-auto aspect-square w-full max-w-[520px] rounded-full object-cover"
          />
        </section>

        {/* Welcome */}
        <section id="about" className="bg-leaf-mint py-16 md:py-24">
          <div className="page grid items-center gap-10 md:grid-cols-2">
            <img
              src={images.welcome}
              alt="Fresh salad bowl"
              className="mx-auto aspect-square w-full max-w-[460px] rounded-full object-cover"
            />
            <div>
              <h2 className="h-display text-4xl md:text-5xl">Welcome to delizioso</h2>
              <p className="mt-5 max-w-[460px] text-sm leading-6 text-ink/80 md:text-base">{lorem}</p>
              <Link to="/menu" className="btn-brand mt-8 !px-8 !py-3.5">See our menu</Link>
            </div>
          </div>
        </section>

        {/* Popular menu */}
        <section className="page py-16 md:py-24">
          <h2 className="h-display text-center text-3xl md:text-5xl">Our popular menu</h2>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 md:justify-center" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs md:text-sm ${cat === c ? "bg-ink text-white" : "bg-cream"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {popular.map((i) => <MenuCard key={i.id} item={i} compact />)}
          </div>
        </section>

        {/* Reserve */}
        <section className="bg-[#FFFBF5] py-16 md:py-24">
          <div className="page grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="h-display text-4xl md:text-5xl">Let's reserve<br />a table</h2>
              <p className="mt-5 max-w-[460px] text-sm leading-6 text-ink/80 md:text-base">{lorem}</p>
              <Link to="/reservation" className="btn-brand mt-8 !px-8 !py-3.5">Reservation</Link>
            </div>
            <div className="relative mx-auto grid aspect-square w-full max-w-[420px] place-items-center rounded-full bg-brand-soft">
              <img src={images.groupDining} alt="Our signature pizza" className="h-[80%] w-[80%] rounded-full object-cover" />
              <img src={images.avatars[0]} alt="" aria-hidden className="absolute -right-2 top-6 h-14 w-14 rounded-full border-4 border-white object-cover" />
              <img src={images.avatars[1]} alt="" aria-hidden className="absolute -left-2 bottom-6 h-14 w-14 rounded-full border-4 border-white object-cover" />
            </div>
          </div>
        </section>

        {/* Chefs */}
        <section className="page py-16 md:py-24">
          <h2 className="h-display text-center text-3xl md:text-5xl">Our greatest chef</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {chefs.map((c, i) => (
              <figure key={i} className={`overflow-hidden rounded-2xl text-center ${i % 2 ? "bg-brand-soft" : "bg-leaf-mint"}`}>
                <img src={images.chefs[i]} alt={`${c.name}, ${c.role}`} className="aspect-[3/4] w-full object-cover" loading="lazy" />
                <figcaption className="py-3">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-ink/60">{c.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="page pb-16 md:pb-24">
          <h2 className="h-display text-center text-3xl md:text-5xl">Our customers say</h2>
          <div className="mx-auto mt-10 max-w-[560px] text-center">
            <img src={images.avatars[t]} alt={testimonials[t].name} className="mx-auto h-24 w-24 rounded-full object-cover" />
            <p className="mt-3 text-sm font-semibold">{testimonials[t].name}</p>
            <p className="text-xs text-ink/60">{testimonials[t].role}</p>
            <Quote size={20} className="mx-auto mt-6 text-brand" aria-hidden />
            <p className="mt-2 text-sm leading-6 text-ink/80">{testimonials[t].text}</p>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((p, i) => (
              <button
                key={i}
                onClick={() => setT(i)}
                aria-label={`Show review from ${p.name}`}
                aria-pressed={i === t}
                className={`overflow-hidden rounded-full transition-all ${i === t ? "h-14 w-14 ring-2 ring-brand" : "h-10 w-10 opacity-70"}`}
              >
                <img src={images.avatars[i]} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Open hours */}
        <section className="page pb-16 md:pb-24">
          <div className="relative overflow-hidden rounded-[32px] bg-espresso px-6 py-14 text-center text-white">
            <img src={images.openBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="relative">
              <h2 className="font-serif text-4xl font-bold md:text-5xl">we are<br />open from</h2>
              <p className="mt-4 text-sm font-semibold">Monday–Sunday</p>
              <p className="mt-1 text-xs leading-5 text-white/80">
                Launch : Mon–Sun 11:00am–02:00pm<br />Dinner : Sunday 04:00pm–08:00pm
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Link to="/reservation" className="btn-leaf w-48">Reservation</Link>
                <Link to="/menu" className="btn-brand w-48">Order now</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}