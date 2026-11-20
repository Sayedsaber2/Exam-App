import { NavLink, useLocation } from "react-router-dom";
import { BookOpenCheck, FolderCode, GraduationCap, Logs, User, X } from "lucide-react";
import elevateLogo from "@/assets/elevate-logo.svg";
import SidebarUser from "./SidebarUser";
import { drawerClass } from "./drawer-class";
import { adminNavItemClass } from "./nav-item-class";

type Props = {
    // open: مفتوح على الموبايل ولا لأ، زي سايدبار التطبيق بالظبط
    open: boolean;
    onClose: () => void;
};

// نفس مقاسات سايدبار التطبيق (360px · بادينج 40) بس غامق: gray-800 (فيجما)
export default function AdminSidebar({ open, onClose }: Props) {
    const { pathname } = useLocation();
    // examsActive: صفحات الأسئلة جزء من الامتحانات، فزرار Exams يفضل منوّر فيها
    const examsActive = pathname.startsWith("/admin/exams") || pathname.startsWith("/admin/questions");

    return (
        <>
            {/* الخلفية الغامقة ورا الدرج على الموبايل */}
            {open && <div onClick={onClose} aria-hidden="true" className="fixed inset-0 z-40 bg-black/40 lg:hidden" />}

            <aside className={`${drawerClass(open)} bg-gray-800 font-mono`}>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center text-white lg:hidden"
                >
                    <X size={22} />
                </button>

                <div>
                    {/* brightness-0 invert = حوّل اللوجو الغامق لأبيض من غير ما نحتاج صورة تانية */}
                    <img src={elevateLogo} alt="ELEVATE" className="w-48 brightness-0 invert" />
                    <div className="mt-2 flex items-center gap-2.5 text-white">
                        <FolderCode size={22} />
                        <span className="text-lg font-medium">Exam App</span>
                    </div>
                </div>

                <nav className="mt-15 flex flex-col gap-3">
                    <NavLink to="/admin/diplomas" onClick={onClose} className={adminNavItemClass}>
                        <GraduationCap size={20} />
                        Diplomas
                    </NavLink>

                    <NavLink to="/admin/exams" onClick={onClose} className={adminNavItemClass({ isActive: examsActive })}>
                        <BookOpenCheck size={20} />
                        Exams
                    </NavLink>

                    <NavLink to="/account" onClick={onClose} className={adminNavItemClass}>
                        <User size={20} />
                        Account Settings
                    </NavLink>

                    <NavLink to="/admin/audit-logs" onClick={onClose} className={adminNavItemClass}>
                        <Logs size={20} />
                        Audit Log
                    </NavLink>
                </nav>

                <SidebarUser variant="admin" />
            </aside>
        </>
    );
}
