import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/layout/AdminSidebar";

// زي MainLayout بالظبط — بس بالسايدبار الغامق
// main من غير بادينج: كل صفحة أدمن بتبدأ بشريط أبيض لازق في الحواف (AdminPageHeader)
export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-muted">
            <AdminSidebar />
            <main className="min-w-0 flex-1">
                <Outlet />
            </main>
        </div>
    );
}
