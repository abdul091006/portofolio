"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Loader2, LockKeyhole, Terminal } from "lucide-react";

const inputClass =
  "h-12 w-full rounded-sm border border-cyan-300/20 bg-[#050914] px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/15";

export default function DashboardLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("Credential required");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("Authenticating...");

    try {
      const response = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setMessage("Email atau password salah");
        return;
      }

      setMessage("Access granted");
      router.refresh();
    } catch {
      setMessage("Login gagal");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#05070d] px-5 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="cyber-section size-full" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="data-panel clip-corner relative z-10 w-full max-w-md overflow-hidden border border-cyan-300/20 bg-[#07111d] p-6 shadow-[0_0_48px_rgba(34,211,238,0.08)]"
      >
        <div className="mb-7 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-sm border border-cyan-300/35 bg-cyan-300/10 text-cyan-200">
            <LockKeyhole className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-xs uppercase text-cyan-300">
              Secure console
            </p>
            <h1 className="text-2xl font-semibold text-white">
              Dashboard Login
            </h1>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="font-mono text-[0.68rem] uppercase text-cyan-200">
              Email
            </span>
            <input
              className={inputClass}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[0.68rem] uppercase text-cyan-200">
              Password
            </span>
            <input
              className={inputClass}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase text-slate-400">
            <Terminal className="size-4 text-cyan-300" aria-hidden="true" />
            {message}
          </span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="primary-action inline-flex h-11 items-center gap-2 rounded-sm bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <LockKeyhole className="size-4" aria-hidden="true" />
            )}
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
