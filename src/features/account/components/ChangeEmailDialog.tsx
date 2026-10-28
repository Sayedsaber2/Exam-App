import { useState } from "react";
import { PencilLine } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StepIndicator from "@/features/auth/components/register/StepIndicator";
import NewEmailStep from "./NewEmailStep";
import VerifyEmailStep from "./VerifyEmailStep";

// مودال بخطوتين (زي الريجستر): الإيميل الجديد → كود التأكيد
export default function ChangeEmailDialog() {
    const [open, setOpen] = useState(false);
    const [newEmail, setNewEmail] = useState<string | null>(null); // null = لسه في الخطوة الأولى

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen);
        if (!nextOpen) setNewEmail(null); // قفل المودال = ابدأ من الأول المرة الجاية
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={<button type="button" className="flex cursor-pointer items-center gap-2 text-sm text-primary hover:underline" />}
            >
                <PencilLine className="size-4" />
                Change
            </DialogTrigger>

            {/* فيجما: 576px (الافتراضي) · stepper → عنوان 28px · عنوان → محتوى 32px */}
            <DialogContent className="gap-0">
                <StepIndicator current={newEmail ? 2 : 1} total={2} />

                <DialogHeader className="mt-7">
                    <DialogTitle>Change Email</DialogTitle>
                </DialogHeader>

                <div className="mt-8">
                    {newEmail ? (
                        <VerifyEmailStep email={newEmail} onBack={() => setNewEmail(null)} onDone={() => handleOpenChange(false)} />
                    ) : (
                        <NewEmailStep onNext={setNewEmail} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
