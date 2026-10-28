import { useNavigate } from "react-router-dom";
import { Ellipsis, Eye, ListPlus, PencilLine, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
    viewTo: string; // رابط صفحة العرض
    // editTo: رابط صفحة التعديل، ولو مش موجود زرار Edit مش بيظهر (زي سجل التغييرات)
    editTo?: string;
    // onDelete: الصفحة هي اللي تقرر تعمل إيه، ولو مش موجود زرار Delete مش بيظهر
    onDelete?: () => void;
    locked?: boolean; // مقفول (immutable) والمستخدم مش سوبر أدمن → Edit و Delete مقفولين
    // addQuestionsTo: رابط صفحة إضافة الأسئلة، بيتبعت من جدول الامتحانات بس
    addQuestionsTo?: string;
};

const ITEM = "cursor-pointer gap-2.5 rounded-none px-3 py-2.5 text-sm text-gray-800 focus:bg-accent focus:text-gray-800";

// زرار "···" في آخر كل صف → View / Edit / Delete (فيجما)
export default function RowActions({ viewTo, editTo, onDelete, locked = false, addQuestionsTo }: Props) {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label="Row actions"
                className="flex size-7 cursor-pointer items-center justify-center bg-gray-100 text-gray-800 outline-none hover:bg-gray-200"
            >
                <Ellipsis size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44 rounded-none border-0 bg-background p-0 shadow-lg ring-0">
                <DropdownMenuItem onClick={() => navigate(viewTo)} className={ITEM}>
                    <Eye size={16} className="text-emerald-500!" />
                    View
                </DropdownMenuItem>

                {/* disabled = العنصر بيبان باهت ومينفعش يتداس */}
                {editTo && (
                    <DropdownMenuItem disabled={locked} onClick={() => navigate(editTo)} className={ITEM}>
                        <PencilLine size={16} className="text-primary!" />
                        Edit
                    </DropdownMenuItem>
                )}

                {/* بيظهر بس لو الصفحة بعتت الرابط، يعني في جدول الامتحانات (كومنت فيجما) */}
                {addQuestionsTo && (
                    <DropdownMenuItem disabled={locked} onClick={() => navigate(addQuestionsTo)} className={ITEM}>
                        <ListPlus size={16} className="text-emerald-500!" />
                        Add Questions
                    </DropdownMenuItem>
                )}

                {onDelete && (
                    <DropdownMenuItem disabled={locked} onClick={onDelete} className={ITEM}>
                        <Trash2 size={16} className="text-destructive!" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
