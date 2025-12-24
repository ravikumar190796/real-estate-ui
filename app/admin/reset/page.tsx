import { Suspense } from "react";
import AdminResetClient from "./AdminResetClient";

// Force dynamic rendering to prevent static generation
// This is required for pages that use useSearchParams(), localStorage, and client-side APIs
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminReset() {
  return (
    <Suspense
      fallback={
        <div className="container py-16 flex justify-center">
          <div className="card p-6 w-full max-w-md">
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      }
    >
      <AdminResetClient />
    </Suspense>
  );
}

