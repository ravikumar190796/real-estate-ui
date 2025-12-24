import PropertyDetailsClient from "./PropertyDetailsClient";

// Required for static export - return at least one dummy param
// Actual properties are fetched client-side at runtime
export async function generateStaticParams() {
  return [{ id: "dummy" }];
}

export default function PropertyDetails() {
  return <PropertyDetailsClient />;
}

