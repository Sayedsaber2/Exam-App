import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

type Crumb = { label: string; to?: string };

type Props = {
    icon: ReactNode;          // أيقونة الشريط الأزرق
    title: string;
    crumbs?: Crumb[];         // المسار الصغير فوق الشريط — آخر واحد بيبقى أزرق
    backTo?: string;          // لو موجود: زرار "<" على شمال الشريط
};

export default function PageHeader({ icon, title, crumbs, backTo }: Props) {
    return (
        <div className="space-y-4">
            {/* المسار: Diplomas / Frontend Development / Exams */}
            {crumbs && crumbs.length > 0 && (
                <nav className="-mx-6 -mt-6 flex items-center gap-2 bg-background px-6 py-4 text-muted-foreground font-mono">
                    {crumbs.map((crumb, i) => {
                        const isLast = i === crumbs.length - 1;
                        return (
                            <Fragment key={i}>
                                {i > 0 && <span>/</span>}
                                {crumb.to && !isLast ? (
                                    <Link to={crumb.to} className="hover:text-primary">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className={isLast && crumbs.length > 1 ? "text-primary" : undefined}>{crumb.label}</span>
                                )}
                            </Fragment>
                        );
                    })}
                </nav>
            )}

            <div className="flex items-stretch gap-4">
                {backTo && (
                    <Link
                        to={backTo}
                        aria-label="Back"
                        className="flex w-11 shrink-0 items-center justify-center border border-primary text-primary transition-colors hover:bg-accent"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                )}

                {/* الشريط الأزرق: 80px ارتفاع · أيقونة + عنوان أبيض */}
                <div className="flex h-20 flex-1 items-center gap-4 bg-primary px-8 text-primary-foreground [&_svg]:size-8">
                    {icon}
                    <h1 className="font-inter text-3xl font-semibold">{title}</h1>
                </div>
            </div>
        </div>
    );
}
