import AdminNavigationLayout from "@/components/admin/LayoutNavigation";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavigationLayout />
      {children}
    </>
  );
}
