import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout() {
    return (
        // الفصل بين السايدبار والمحتوى بفرق الخلفية — من غير بوردر (زي الفيجما)
        <div className="flex min-h-screen bg-muted">
            <Sidebar />
            <main className="min-w-0 flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
