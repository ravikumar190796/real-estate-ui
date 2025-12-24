"use client";

import { FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AdminResetClient() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const searchParams = useSearchParams();
  const router = useRouter();
  const presetToken = searchParams.get("token") || "";
  const [token, setToken] = useState(presetToken);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`${apiUrl}/api/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Reset failed");
      setMessage("Password updated. Redirecting to login...");
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
      }
      setTimeout(() => router.push("/admin/login"), 1200);
    } catch (err: any) {
      setError(err.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-16 flex justify-center">
      <form onSubmit={handleSubmit} className="card p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Set a new password</h1>
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Reset token"
          className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="New password"
          className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {message ? <p className="text-sm text-green-600">{message}</p> : null}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Saving..." : "Save new password"}
        </button>
      </form>
    </div>
  );
}
