import { cn } from "@/shared/lib/tailwind-merge";

type Options = {
    border?: boolean; // السايدبار: نشط = خلفية + بوردر · تابات الأكونت: خلفية بس (فيجما)
};

// عنصر قايمة: 54px ارتفاع · نشط = خلفية زرقا فاتحة (+ بوردر أزرق في السايدبار)
// outline-none = من غير إطار الفوكس اللي المتصفح بيرسمه بعد الضغط (فيجما مفيهاش)
export function navItemClass({ isActive }: { isActive: boolean }, { border = true }: Options = {}) {
    return cn(
        "flex items-center gap-3 px-4 py-4 transition-colors outline-none",
        border && "border border-transparent",
        isActive ? "bg-blue-100 text-primary" : "text-muted-foreground hover:bg-blue-100/60 hover:text-primary",
        isActive && border && "border-primary",
    );
}

// نفس العنصر بس للسايدبار الغامق بتاع الأدمن: نشط = خلفية gray-700 + بوردر gray-500 (فيجما)
export function adminNavItemClass({ isActive }: { isActive: boolean }) {
    return cn(
        "flex items-center gap-3 border px-4 py-4 text-white transition-colors outline-none",
        isActive ? "border-gray-500 bg-gray-700" : "border-transparent hover:bg-gray-700/50",
    );
}