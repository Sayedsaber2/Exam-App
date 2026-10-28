import { Outlet, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import AccountTabs from "@/features/account/components/AccountTabs";

export default function AccountLayout() {
    const { pathname } = useLocation();

    // المسار الصغير بيتغير مع التاب: "Account" أو "Account / Change Password" (فيجما)
    const isChangePassword = pathname.endsWith("/change-password");
    const crumbs = isChangePassword? [{ label: "Account", to: "/account" }, { label: "Change Password" }]: [{ label: "Account" }];

    return (
        // min-h = ارتفاع الشاشة ناقص بادينج main (p-6 فوق وتحت = 3rem) → العمودين يملوا الصفحة زي فيجما
        <div className="flex min-h-[calc(100vh-3rem)] flex-col gap-6 font-mono">
            <PageHeader icon={<User />} title="Account Settings" crumbs={crumbs} backTo="/" />
        
            {/* عمودين بنفس الارتفاع: التابات شمال · محتوى التاب يمين · flex-1 = خد باقي الارتفاع */}
            <div className="flex flex-1 items-stretch gap-4">
                <AccountTabs />
                
                <section className="min-w-0 flex-1 bg-background p-8 ">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}