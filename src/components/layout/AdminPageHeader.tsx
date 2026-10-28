import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

type Props = {
    crumbs: Crumb[]; // المسار الصغير: "Diplomas" أو "Diplomas / Add New"
    children?: ReactNode; // محتوى الشريط التاني (الترقيم + زرار الإضافة) — اختياري
};  

// أول حاجة في كل صفحة أدمن: شريطين أبيض فوق بعض (فيجما)
export default function AdminPageHeader({ crumbs, children }: Props) {
    return (
        <div className="bg-background font-mono">
            {/* الشريط الأول: المسار */}
            <nav className="flex items-center gap-2 border-b border-gray-200 px-4 py-4 text-sm text-gray-400">
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    return (
                        // key: رقم الكلمة مش نصها، عشان لو كلمتين نفس النص (زي "...") الريأكت ميتلخبطش
                        <Fragment key={i}>
                            {i > 0 && <span>/</span>}
                            {crumb.to ? (
                                // truncate: الأسامي الطويلة بتتقطع بنقط زي فيجما
                                <Link to={crumb.to} className="max-w-48 truncate hover:text-primary">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className={isLast && crumbs.length > 1 ? "text-primary" : ""}>{crumb.label}</span>
                            )}
                        </Fragment>
                    );
                })}
            </nav>

            {/* الشريط التاني (72px): بيظهر بس لو الصفحة بعتتله محتوى */}
            {children && <div className="flex h-18 items-center justify-between px-6">{children}</div>}
        </div>
    );
}
