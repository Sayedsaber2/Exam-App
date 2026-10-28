import { NavLink, useLocation } from "react-router-dom";
import { Code, Folder, GraduationCap, User } from "lucide-react";
import elevateLogo from "@/assets/elevate-logo.svg";
import SidebarUser from "./SidebarUser";
import { navItemClass } from "./nav-item-class"; // مشترك مع تابات الأكونت

export default function Sidebar() {
    const { pathname } = useLocation();
    // Diplomas تفضل مضوّية في كل الرحلة: الرئيسية → امتحانات الدبلومة → الكويز (زي فيجما)
    const diplomasActive = pathname === "/" || pathname.startsWith("/diplomas") || pathname.startsWith("/exams");

    return (
        // العرض والبادينج من فيجما: 360px · بادينج جانبي 40px · فوق 36px · تحت 36px
        <aside className="sticky top-0 flex h-screen w-90 shrink-0 flex-col bg-accent px-10 pt-9 pb-9 font-mono">
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

            
            <nav className="mt-10 flex flex-col gap-2.5">
                <NavLink to="/" className={navItemClass({ isActive: diplomasActive })}>
                    <GraduationCap size={20} />
                    Diplomas
                </NavLink>

                <NavLink to="/account" className={navItemClass}>
                    <User size={20} />
                    Account Settings
                </NavLink>
            </nav>

            <SidebarUser />
        </aside>
    );
}
