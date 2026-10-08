
import { Link, useNavigate } from "react-router-dom";
import { AuthActions, Field } from "./AuthLayout.jsx";
import { images } from "../data/images.js";
import pancake from "../Assets/pancake.png";

export default function Login() {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-screen md:grid-cols-2">
      {/* Login Section */}
      <section className="relative flex min-h-screen flex-col justify-center px-6 py-20 sm:px-10 md:px-12 lg:px-[18%] lg:py-16">
        
        {/* Mobile Image */}
        <img
          src={images.pancakes}
          alt=""
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 w-full object-cover sm:h-40 md:hidden"
        />

        {/* Logo */}
        <Link
          to="/"
          aria-label="Delizioso home"
          className="absolute left-6 top-6 z-10 grid h-7 w-7 place-items-center rounded-full bg-brand text-[10px] font-bold text-white"
        >
          D
        </Link>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl font-semibold">Login</h1>

          <p className="mt-2 text-xs">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-600">
              Sign up
            </Link>
          </p>

          <div className="mt-7 space-y-4">
            <Field
              label="Email address"
              type="email"
              placeholder="hbleemartinez@gmail.com"
              required
            />

            <Field
              label="Password"
              type="password"
              placeholder="••••••••••••"
              required
            />
          </div>

          <AuthActions />
        </form>

        {/* Copyright */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-ink/40">
          Copyright © 2022 Delizioso
        </p>
      </section>

      {/* Desktop Image */}
      <section className="hidden min-h-screen md:block">
        <img
          src={pancake}
          alt="Stack of pancakes with blueberries"
          className="h-screen w-full object-cover"
        />
      </section>
    </main>
  );
}
