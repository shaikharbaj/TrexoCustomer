import DashboardLayout from "@/components/layout/dashboard-layout";
import PublicLayout from "@/components/layout/public-layout";

const layout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <PublicLayout>{children}</PublicLayout>
  );
};

export default layout;
