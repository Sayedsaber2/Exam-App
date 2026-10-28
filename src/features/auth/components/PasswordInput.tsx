import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/lib/tailwind-merge";

// بياخد نفس props الـ Input بالظبط — ما عدا type، لأن الكومبوننت ده هو اللي بيتحكم فيه
type Props = Omit<ComponentProps<typeof Input>, "type">;

export default function PasswordInput({ className, ...props }: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            {/* pr-10 عشان الكتابة متدخلش تحت أيقونة العين */}
            <Input {...props} type={show ? "text" : "password"} className={cn("pr-10", className)} />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}
