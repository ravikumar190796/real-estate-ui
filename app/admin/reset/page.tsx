import AdminResetClient from "./AdminResetClient";

// Force dynamic rendering to prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminReset() {
  return <AdminResetClient />;
}

