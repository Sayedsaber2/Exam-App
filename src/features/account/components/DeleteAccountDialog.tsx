import { Loader2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useProfile } from "../hooks/useProfile";

export default function DeleteAccountDialog() {
    const { mutate, isPending, error } = useDeleteAccount();
    const { data: user } = useProfile();
    // isSuperAdmin: السيرفر مش بيسمح للسوبر أدمن يمسح حسابه (Swagger)، فالزرار بيتقفل
    const isSuperAdmin = isSuperAdminRole(user?.role);

    return (
        <Dialog>
            {/* render = "خلّي الزرار ده هو اللي بيفتح المودال" — type=button عشان ميبعتش الفورم اللي حواليه */}
            {/* disabled: بنحطها على الـ DialogTrigger نفسه، لأنه هو اللي بيتحكم في الزرار */}
            <DialogTrigger
                disabled={isSuperAdmin}
                render={
                    <Button
                        type="button"
                        variant="ghost"
                        title={isSuperAdmin ? "Super admin account can not be deleted" : undefined}
                        className="h-11 flex-1 bg-red-50 text-destructive hover:bg-red-100 hover:text-destructive"
                    />
                }
            >
                Delete My Account
            </DialogTrigger>

            {/* فيجما: 556px عرض · الأيقونة بعد 60px من فوق */}
            <DialogContent className="gap-0 sm:max-w-139">
                {/* دايرتين: هالة red-50 بقطر 108 → دايرة red-100 بقطر 64 → مثلث 32 */}
                <div className="mx-auto mt-6 flex size-27 items-center justify-center rounded-full bg-red-50">
                    <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
                        <TriangleAlert className="size-8 text-destructive" />
                    </div>
                </div>

                <DialogHeader className="mt-10 items-center gap-3 text-center">
                    <DialogTitle className="font-sans text-lg leading-snug font-medium text-destructive">
                        Are you sure you want to delete your account?
                    </DialogTitle>
                    <DialogDescription>This action is permanent and cannot be undone.</DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="mt-6">
                        <ErrorAlert message={getErrorMessage(error)} />
                    </div>
                )}

                {/* فيجما: بادينج جانبي 56px · فراغ 12px بين الزرارين */}
                <DialogFooter className="mt-9 bg-gray-50 px-14">
                    <DialogClose render={<Button variant="secondary" className="h-11 flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200" />}>
                        Cancel
                    </DialogClose>
                    <Button
                        className="h-11 flex-1 bg-destructive text-white hover:bg-destructive/90"
                        onClick={() => mutate()}
                        disabled={isPending}
                    >
                        {isPending && <Loader2 className="animate-spin" />}
                        Yes, delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
