import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MobileTopBar from "@/components/layout/MobileTopBar";
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout() {
    const { pathname } = useLocation();
    // openOn: الصفحة اللي فتحنا عليها المنيو، و null يعني مقفول
    const [openOn, setOpenOn] = useState<string | null>(null);
    // menuOpen: مفتوح بس طول ما إحنا على نفس الصفحة، فأول ما نروح صفحة تانية بيتقفل لوحده
    const menuOpen = openOn === pathname;

    return (
        // الفصل بين السايدبار والمحتوى بفرق الخلفية — من غير بوردر (زي الفيجما)
        <div className="flex min-h-screen bg-muted">
            <Sidebar open={menuOpen} onClose={() => setOpenOn(null)} />

            <div className="min-w-0 flex-1">
                <MobileTopBar onMenuClick={() => setOpenOn(pathname)} />

                {/* p-4: مسافة أصغر على الموبايل، و sm:p-6 زي فيجما */}
                <main className="p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
