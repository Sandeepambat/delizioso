import { Link, useNavigate } from "react-router-dom";
import { AuthActions, Field } from "./AuthLayout.jsx";
import { images } from "../data/images.js";
import noodels from "../Assets/noodels.png";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-screen overflow-hidden md:grid-cols-2">
      <section className="relative flex flex-col justify-center px-8 pb-20 pt-52 md:px-[18%] md:py-16">
        <img src={images.pasta} alt="" aria-hidden className="absolute inset-x-0 top-0 h-44 w-full object-cover md:hidden" />
        <Link to="/" aria-label="Delizioso home" className="absolute left-6 top-6 grid h-6 w-6 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">D</Link>
        <form onSubmit={(e) => { e.preventDefault(); navigate("/login"); }}>
          <h1 className="text-2xl font-semibold">Sign up</h1>
          <p className="mt-2 text-xs">Don't have an account? <Link to="/login" className="text-sky-600">Log in</Link></p>
          <div className="mt-8 space-y-4">
            <Field type="text" placeholder="Full name" aria-label="Full name" required />
            <Field type="email" placeholder="Email address" aria-label="Email address" required />
            <Field type="password" placeholder="Password" aria-label="Password" required />
          </div>
          <AuthActions />
        </form>
      </section>
      <section className="relative hidden md:block">
        <div className="absolute -right-4 top-[6%] grid h-[88%] aspect-square place-items-center rounded-full bg-brand">
          <img src={noodels} alt="Plate of spaghetti with basil" className="h-[68%] w-[78%] rounded-full object-cover shadow-xl ring-[14px] ring-white/70" />
        </div>
      </section>
    </main>
  );
}
