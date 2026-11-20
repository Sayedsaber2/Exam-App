import { Menu } from "lucide-react";
import elevateLogo from "@/assets/elevate-logo.svg";

type Props = {
    // onMenuClick: بيفتح السايدبار
    onMenuClick: () => void;
    // variant: app فاتح، و admin غامق زي السايدبار بتاعه
    variant?: "app" | "admin";
};

// شريط بيظهر فوق على الموبايل والتابلت بس
// lg:hidden: من أول 1024 بكسل بيختفي، لأن السايدبار بيبقى ظاهر على طول
export default function MobileTopBar({ onMenuClick, variant = "app" }: Props) {
    const isAdmin = variant === "admin";

    return (
        <header
            className={`sticky top-0 z-30 flex h-14 items-center justify-between px-4 lg:hidden ${
                isAdmin ? "bg-gray-800 text-white" : "border-b border-gray-200 bg-background text-primary"
            }`}
        >
            {/* brightness-0 invert: اللوجو يبقى أبيض على الخلفية الغامقة */}
            <img src={elevateLogo} alt="ELEVATE" className={`h-6 w-auto ${isAdmin ? "brightness-0 invert" : ""}`} />

            {/* aria-label: الزرار أيقونة بس، فبنكتب اسمه لقارئ الشاشة */}
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Open menu"
                className="flex size-10 cursor-pointer items-center justify-center"
            >
                <Menu size={24} />
            </button>
        </header>
    );
}
