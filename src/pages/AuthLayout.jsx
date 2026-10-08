export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.600 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.500 0 11.9-2.1 15.900-5.800l-7.6-5.900c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z" />
    </svg>
  );
}

import { Link } from "react-router-dom";

export function Field({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-xs font-semibold">{label}</span>}
      <input {...props} className="h-12 w-full rounded-lg bg-cream px-4 text-sm outline-none ring-brand/60 placeholder:text-ink/40 focus:ring-2" />
    </label>
  );
}

export function AuthActions({ onSubmit }) {
  return (
    <>
      <div className="mt-5 flex items-center justify-between text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-brand" /> Remember me</label>
        <a href="#" className="hover:text-brand">Forget Password?</a>
      </div>
      <button type="submit" className="btn-block mt-6 !h-12 bg-brand !text-sm text-white hover:bg-brand-dark">Log in</button>
      <button type="button" className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-ink/15 text-sm font-medium hover:bg-cream">
        <GoogleIcon /> Log in with google
      </button>
    </>
  );
}
