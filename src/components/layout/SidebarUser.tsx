import { useNavigate } from "react-router-dom";
import { Bolt, EllipsisVertical, LayoutGrid, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "@/features/account/hooks/useProfile";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { isAdminRole } from "@/shared/lib/roles";

// ألوان الكارت في السايدبارين — كل الفرق بينهم هنا في مكان واحد
const COLORS = {
    app: {
        skeleton: "bg-blue-100",
        name: "text-primary",
        email: "text-muted-foreground",
        trigger: "text-muted-foreground hover:bg-blue-100 hover:text-primary",
    },
    admin: {
        skeleton: "bg-gray-700",
        name: "text-white",
        email: "text-gray-400",
        trigger: "text-gray-300 hover:bg-gray-700 hover:text-white",
    },
};

// كلاس عناصر القايمة: النص أسود · الأيقونة رمادي (الـ ! عشان الكومبوننت بيحاول يلوّنها وقت الهوفر)
const ITEM = "cursor-pointer gap-2.5 rounded-none px-3 py-2.5 text-sm text-foreground focus:bg-accent focus:text-foreground";

type Props = {
    variant?: "app" | "admin"; // app = السايدبار الفاتح · admin = الغامق
};

export default function SidebarUser({ variant = "app" }: Props) {
    const navigate = useNavigate();
    const { data: user, isLoading } = useProfile();
    const { logout } = useLogout();
    const colors = COLORS[variant]; // يا ألوان app يا ألوان admin

    if (isLoading) {
        return (
            <div className="mt-auto flex items-center gap-2.5">
                <div className={`size-16 shrink-0 animate-pulse ${colors.skeleton}`} />
                <div className="min-w-0 flex-1 space-y-2">
                    <div className={`h-3.5 w-1/2 animate-pulse ${colors.skeleton}`} />
                    <div className={`h-3 w-4/5 animate-pulse ${colors.skeleton}`} />
                </div>
            </div>
        );
    }

    const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
    const initials = user ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase() : "U";

    return (
        <div className="mt-auto flex items-center gap-2.5">
            {/* صورة مربعة — زي فيجما */}
            <Avatar className="size-13 shrink-0 rounded-none after:hidden">
                <AvatarImage src={user?.profilePhoto ?? undefined} alt={fullName} className="rounded-none object-cover" />
                <AvatarFallback className="rounded-none bg-primary text-sm text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
                <p className={`truncate text-base font-medium ${colors.name}`}>{user?.firstName ?? "User"}</p>
                <p className={`truncate text-sm ${colors.email}`}>{user?.email}</p>
            </div>

            {/* الـ 3 نقط = زرار الدروب داون */}
            <DropdownMenu>
                <DropdownMenuTrigger
                    aria-label="User menu"
                    className={`flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors ${colors.trigger}`}
                >
                    <EllipsisVertical size={18} />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="top"
                    sideOffset={8}
                    className="w-52 rounded-none border-0 bg-background p-1 shadow-lg ring-0"
                >
                    <DropdownMenuItem onClick={() => navigate("/account")} className={ITEM}>
                        <Settings size={16} className="text-muted-foreground!" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-input" />

                    {/* في التطبيق العادي: الأدمن يشوف "Dashboard" يدخل بيها لوحة الأدمن */}
                    {variant === "app" && isAdminRole(user?.role) && (
                        <>
                            <DropdownMenuItem onClick={() => navigate("/admin")} className={ITEM}>
                                <Bolt size={16} className="text-muted-foreground!" />
                                Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 bg-input" />
                        </>
                    )}

                    {/* جوه لوحة الأدمن: "Application" ترجّعه للتطبيق العادي (فيجما) */}
                    {variant === "admin" && (
                        <>
                            <DropdownMenuItem onClick={() => navigate("/")} className={ITEM}>
                                <LayoutGrid size={16} className="text-muted-foreground!" />
                                Application
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1 bg-input" />
                        </>
                    )}

                    {/* variant="destructive" = الكومبوننت نفسه بيلوّن النص والأيقونة أحمر */}
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={logout}
                        className="cursor-pointer gap-2.5 rounded-none px-3 py-2.5 text-sm"
                    >
                        {/* -scale-x-100 = اقلب الأيقونة أفقيًا فالسهم يبص شمال زي فيجما */}
                        <LogOut size={16} className="-scale-x-100" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
