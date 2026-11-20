import { NavLink, useLocation } from "react-router-dom";
import { Code, Folder, GraduationCap, User, X } from "lucide-react";
import elevateLogo from "@/assets/elevate-logo.svg";
import SidebarUser from "./SidebarUser";
import { drawerClass } from "./drawer-class";
import { navItemClass } from "./nav-item-class"; // مشترك مع تابات الأكونت

type Props = {
    // open: مفتوح على الموبايل ولا لأ، وعلى الكمبيوتر ظاهر على طول
    open: boolean;
    onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
    const { pathname } = useLocation();
    // Diplomas تفضل مضوّية في كل الرحلة: الرئيسية → امتحانات الدبلومة → الكويز (زي فيجما)
    const diplomasActive = pathname === "/" || pathname.startsWith("/diplomas") || pathname.startsWith("/exams");

    return (
        <>
            {/* الخلفية الغامقة ورا الدرج: بتظهر على الموبايل بس، ولما تدوس عليها الدرج بيتقفل */}
            {open && <div onClick={onClose} aria-hidden="true" className="fixed inset-0 z-40 bg-black/40 lg:hidden" />}

            {/* drawerClass: على الموبايل درج، ومن أول lg نفس مقاسات فيجما (360px) */}
            <aside className={`${drawerClass(open)} bg-accent font-mono`}>
                {/* زرار القفل: على الموبايل بس */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center text-primary lg:hidden"
                >
                    <X size={22} />
                </button>

                {/* اللوجو 38px ارتفاع · تحته Exam App بمسافة 18px */}
                <div className="gap-2.5">
                    <img src={elevateLogo} alt="ELEVATE" className=" w-48" />
                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <Folder size={22} fill="var(--color-primary)" className="text-primary" />
                            <Code
                                size={11}
                                strokeWidth={2.5}
                                className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                            />
                        </div>
                        <span className="text-lg font-medium text-primary">Exam App</span>
                    </div>
                </div>

                {/* onClick: لو دست على لينك الصفحة اللي إنت فيها، الدرج برضه يتقفل */}
                <nav className="mt-10 flex flex-col gap-2.5">
                    <NavLink to="/" onClick={onClose} className={navItemClass({ isActive: diplomasActive })}>
                        <GraduationCap size={20} />
                        Diplomas
                    </NavLink>

                    <NavLink to="/account" onClick={onClose} className={navItemClass}>
                        <User size={20} />
                        Account Settings
                    </NavLink>
                </nav>

                <SidebarUser />
            </aside>
        </>
    );
}
