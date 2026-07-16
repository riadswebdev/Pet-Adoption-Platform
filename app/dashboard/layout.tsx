import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayoutWrapper>
        {children}
      </DashboardLayoutWrapper>
    </ProtectedRoute>
  );
}
