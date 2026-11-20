import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "@/components/layout/AdminSidebar";
import MobileTopBar from "@/components/layout/MobileTopBar";

// زي MainLayout بالظبط — بس بالسايدبار الغامق
// main من غير بادينج: كل صفحة أدمن بتبدأ بشريط أبيض لازق في الحواف (AdminPageHeader)
export default function AdminLayout() {
    const { pathname } = useLocation();
    // openOn: نفس فكرة MainLayout، المنيو بيتقفل لوحده لما الصفحة تتغير
    const [openOn, setOpenOn] = useState<string | null>(null);
    const menuOpen = openOn === pathname;

    return (
        <div className="flex min-h-screen bg-muted">
            <AdminSidebar open={menuOpen} onClose={() => setOpenOn(null)} />

            <div className="min-w-0 flex-1">
                <MobileTopBar variant="admin" onMenuClick={() => setOpenOn(pathname)} />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
