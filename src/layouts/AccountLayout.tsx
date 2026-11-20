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
        // lg:min-h = على الكمبيوتر بس: ارتفاع الشاشة ناقص بادينج main (3rem) → العمودين يملوا الصفحة زي فيجما
        <div className="flex flex-col gap-6 font-mono lg:min-h-[calc(100vh-3rem)]">
            <PageHeader icon={<User />} title="Account Settings" crumbs={crumbs} backTo="/" />
        
            {/* عمودين بنفس الارتفاع: التابات شمال · محتوى التاب يمين · flex-1 = خد باقي الارتفاع */}
            {/* الموبايل: التابات فوق والفورم تحتها، ومن أول lg جنب بعض */}
            <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-stretch">
                <AccountTabs />
                
                <section className="min-w-0 flex-1 bg-background p-4 sm:p-8">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}