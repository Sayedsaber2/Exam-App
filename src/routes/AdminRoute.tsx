import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProfile } from "@/features/account/hooks/useProfile";
import { isAdminRole } from "@/shared/lib/roles";

// الحارس التاني: ProtectedRoute اتأكد إن فيه توكن — هنا بنتأكد إن صاحبه أدمن
export default function AdminRoute() {
    const { data: user, isLoading } = useProfile();

    // لسه بنجيب البروفايل → منقررش حاجة (لو رجّعناه بدري هيترمي على "/" وهو أدمن)
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    // مش أدمن (أو البروفايل فشل) → رجّعه للتطبيق العادي
    if (!user || !isAdminRole(user.role)) return <Navigate to="/" replace />;

    return <Outlet />;
}
