import { NavLink, useLocation } from "react-router-dom";
import { BookOpenCheck, FolderCode, GraduationCap, Logs, User } from "lucide-react";
import elevateLogo from "@/assets/elevate-logo.svg";
import SidebarUser from "./SidebarUser";
import { adminNavItemClass } from "./nav-item-class";

// نفس مقاسات سايدبار التطبيق (360px · بادينج 40) بس غامق: gray-800 (فيجما)
export default function AdminSidebar() {
    const { pathname } = useLocation();
    // examsActive: صفحات الأسئلة جزء من الامتحانات، فزرار Exams يفضل منوّر فيها
    const examsActive = pathname.startsWith("/admin/exams") || pathname.startsWith("/admin/questions");

    return (
        <aside className="sticky top-0 flex h-screen w-90 shrink-0 flex-col bg-gray-800 px-10 pt-9 pb-9 font-mono">
            <div>
                {/* brightness-0 invert = حوّل اللوجو الغامق لأبيض من غير ما نحتاج صورة تانية */}
                <img src={elevateLogo} alt="ELEVATE" className="w-48 brightness-0 invert" />
                <div className="mt-2 flex items-center gap-2.5 text-white">
                    <FolderCode size={22} />
                    <span className="text-lg font-medium">Exam App</span>
                </div>
            </div>

            <nav className="mt-15 flex flex-col gap-3">
                <NavLink to="/admin/diplomas" className={adminNavItemClass}>
                    <GraduationCap size={20} />
                    Diplomas
                </NavLink>

                <NavLink to="/admin/exams" className={adminNavItemClass({ isActive: examsActive })}>
                    <BookOpenCheck size={20} />
                    Exams
                </NavLink>

                <NavLink to="/account" className={adminNavItemClass}>
                    <User size={20} />
                    Account Settings
                </NavLink>

                <NavLink to="/admin/audit-logs" className={adminNavItemClass}>
                    <Logs size={20} />
                    Audit Log
                </NavLink>
            </nav>

            <SidebarUser variant="admin" />
        </aside>
    );
}
