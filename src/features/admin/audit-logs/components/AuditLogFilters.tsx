import { useState, type FormEvent } from "react";
import { ChevronsDownUp, ChevronsUpDown, SlidersHorizontal } from "lucide-react";
import NativeSelect from "@/features/admin/shared/components/NativeSelect";
import { ACTION_LABELS, CATEGORY_LABELS } from "../audit-log-labels";
import type { AuditFiltersValue } from "../types";

// Object.entries: بيحوّل الـ object لقايمة أزواج، وبعدين بنعمل منها اختيارات للـ select
const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }));
const ACTION_OPTIONS = Object.entries(ACTION_LABELS).map(([value, label]) => ({ value, label }));

type Props = {
    // initial: القيم الحالية اللي جاية من الـ URL
    initial: AuditFiltersValue;
    onApply: (values: AuditFiltersValue) => void;
    onClear: () => void;
    // userOptions: الأدمنز اللي ممكن نفلتر بيهم
    userOptions: { value: string; label: string }[];
};

// كارت الفلاتر بتاع السجل: تلات قوايم جنب بعض، ومفيهوش خانة بحث (فيجما)
// نفس فكرة SearchFilters بالظبط، الفلتر بيشتغل لما تدوس Apply
export default function AuditLogFilters({ initial, onApply, onClear, userOptions }: Props) {
    const [category, setCategory] = useState(initial.category);
    const [action, setAction] = useState(initial.action);
    const [actorUserId, setActorUserId] = useState(initial.actorUserId);
    const [open, setOpen] = useState(true);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onApply({ category, action, actorUserId });
    }

    function handleClear() {
        setCategory("");
        setAction("");
        setActorUserId("");
        onClear();
    }

    return (
        <form onSubmit={handleSubmit} className="bg-background">
            <div className="flex h-10 items-center justify-between bg-primary px-4 text-white">
                <p className="flex items-center gap-2 font-inter font-semibold">
                    <SlidersHorizontal size={18} />
                    Search & Filters
                </p>
                <button type="button" onClick={() => setOpen(!open)} className="flex cursor-pointer items-center gap-1.5 text-sm">
                    {open ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />}
                    {open ? "Hide" : "Show"}
                </button>
            </div>

            {open && (
                <div className="flex flex-col gap-3 p-4">
                    {/* flex-1: التلاتة واخدين نفس العرض (فيجما) */}
                    <div className="flex gap-2">
                        <NativeSelect
                            placeholder="Category"
                            options={CATEGORY_OPTIONS}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex-1"
                        />
                        <NativeSelect
                            placeholder="Action"
                            options={ACTION_OPTIONS}
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            className="flex-1"
                        />
                        <NativeSelect
                            placeholder="User"
                            options={userOptions}
                            value={actorUserId}
                            onChange={(e) => setActorUserId(e.target.value)}
                            className="flex-1"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={handleClear} className="h-9 cursor-pointer px-4 text-sm text-gray-800 hover:underline">
                            Clear
                        </button>
                        <button type="submit" className="h-9 w-25 cursor-pointer bg-gray-200 text-sm text-gray-800 hover:bg-gray-300">
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}
