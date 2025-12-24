"use client";

import { FormEvent, useState } from "react";

export default function AdminForgot() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    setLoading(true);
    setError("");
    setMessage("");
    setToken("");
    try {
      const res = await fetch(`${apiUrl}/api/auth/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Request failed");
      setMessage(data.message || "If that account exists, you'll get a reset link.");
      if (data.resetToken) {
        setToken(data.resetToken);
      }
    } catch (err: any) {
      setError(err.message || "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-16 flex justify-center">
      <form onSubmit={handleSubmit} className="card p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Reset password</h1>
        <p className="text-sm text-slate-600">
          Enter your admin email. We'll generate a reset link. (In production, this would be emailed.)
        </p>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? <p className="text-sm text-green-600">{message}</p> : null}
        {token ? (
          <div className="text-xs text-slate-600">
            Dev token (copy for testing):{" "}
            <span className="font-mono break-all text-slate-800">{token}</span>
          </div>
        ) : null}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}

