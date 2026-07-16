import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute requireRole="user">{children}</ProtectedRoute>;
}
