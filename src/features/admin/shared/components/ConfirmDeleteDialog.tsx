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
} from "@/components/ui/dialog";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onConfirm: () => void;
    isPending: boolean;
    error: unknown;
    // confirmLabel: كلام الزرار الأحمر، وفي سجل التغييرات بيبقى Yes, clear
    confirmLabel?: string;
};

// مودال تأكيد الحذف بنفس شكل حذف الأكونت
// الصفحة هي اللي بتفتحه وبتقفله، عشان كده بياخد open من برّه
export default function ConfirmDeleteDialog({ open, onOpenChange, title, onConfirm, isPending, error, confirmLabel = "Yes, delete" }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-0 sm:max-w-139 font-mono">
                <div className="mx-auto mt-6 flex size-27 items-center justify-center rounded-full bg-red-50">
                    <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
                        <TriangleAlert className="size-8 text-destructive" />
                    </div>
                </div>

                <DialogHeader className="mt-10 items-center gap-3 text-center">
                    <DialogTitle className="font-sans text-lg leading-snug font-medium text-destructive">{title}</DialogTitle>
                    <DialogDescription>This action is permanent and cannot be undone.</DialogDescription>
                </DialogHeader>

                {error ? (
                    <div className="mt-6">
                        <ErrorAlert message={getErrorMessage(error)} />
                    </div>
                ) : null}

                <DialogFooter className="mt-9 bg-gray-50 px-14">
                    <DialogClose render={<Button variant="secondary" className="h-11 flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200" />}>
                        Cancel
                    </DialogClose>
                    <Button className="h-11 flex-1 bg-destructive text-white hover:bg-destructive/90" onClick={onConfirm} disabled={isPending}>
                        {isPending && <Loader2 className="animate-spin" />}
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
