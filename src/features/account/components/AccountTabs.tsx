import { NavLink } from "react-router-dom";
import { Lock, LogOut,  UserCircle } from "lucide-react";
import { navItemClass } from "@/components/layout/nav-item-class";
import { useLogout } from "@/features/auth/hooks/useLogout";

// العمود الشمال في صفحة الأكونت: تابين فوق + Logout تحت خالص (فيجما)
export default function AccountTabs() {
    const { logout } = useLogout();

    return (
        <nav className="flex w-72 shrink-0 flex-col gap-2.5 bg-background p-6 ">
            {/* end = نشط بس لما المسار /account بالظبط — مش وإحنا في /account/change-password */}
            {/* border: false = التاب النشط خلفية بس من غير بوردر (فيجما) — عكس السايدبار */}
            <NavLink to="/account" end className={({ isActive }) => navItemClass({ isActive }, { border: false })}>
                <UserCircle size={20} />
                Profile
            </NavLink>

            <NavLink to="/account/change-password" className={({ isActive }) => navItemClass({ isActive }, { border: false })}>
                <Lock size={20} />
                Change Password
            </NavLink>

            <button
                type="button"
                onClick={logout}
                className="mt-auto flex cursor-pointer items-center gap-3 bg-red-50 px-4 py-4 text-destructive transition-colors outline-none hover:bg-red-100"
            >
                {/* -scale-x-100 = السهم يبص شمال زي فيجما */}
                <LogOut size={20} className="-scale-x-100" />
                Logout
            </button>
        </nav>
    );
}
