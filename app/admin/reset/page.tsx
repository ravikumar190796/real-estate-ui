import AdminResetClient from "./AdminResetClient";

// Force dynamic rendering to prevent static generation
// This is required for pages that use localStorage and client-side APIs
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminReset() {
  return <AdminResetClient />;
}

