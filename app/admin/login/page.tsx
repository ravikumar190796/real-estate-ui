"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-16 flex justify-center">
      <form onSubmit={handleSubmit} className="card p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Login</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full"
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <div className="text-sm text-slate-600 text-center">
          <Link href="/admin/forgot" className="text-blue-600 font-semibold">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}

