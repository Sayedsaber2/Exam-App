import { useState, type FormEvent } from "react";
import { ChevronsDownUp, ChevronsUpDown, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FiltersValue } from "@/features/admin/shared/types";
import NativeSelect from "@/features/admin/shared/components/NativeSelect";

const IMMUTABILITY_OPTIONS = [
    { value: "true", label: "Immutable only" },
    { value: "false", label: "Editable only" },
];

type Props = {
    // initial: القيم الحالية اللي جاية من الـ URL، والكارت بيبدأ بيها
    initial: FiltersValue;
    onApply: (values: FiltersValue) => void;
    onClear: () => void;
    // diplomaOptions: لو اتبعتت، بتظهر قايمة الدبلومات جنب قايمة القفل (صفحة الامتحانات)
    diplomaOptions?: { value: string; label: string }[];
};

// كارت البحث والفلاتر: مش بيبحث وإنت بتكتب، بيبحث لما تدوس Apply (فيجما)
export default function SearchFilters({ initial, onApply, onClear, diplomaOptions }: Props) {
    const [search, setSearch] = useState(initial.search);
    const [immutable, setImmutable] = useState(initial.immutable);
    const [diplomaId, setDiplomaId] = useState(initial.diplomaId ?? "");
    // open: زرار Hide بيقفل جسم الكارت ويفتحه
    const [open, setOpen] = useState(true);

    // handleSubmit: زرار Apply أو Enter جوه خانة البحث
    function handleSubmit(e: FormEvent) {
        // preventDefault: امنع المتصفح إنه يعمل تحديث للصفحة
        e.preventDefault();
        onApply({ search, immutable, diplomaId });
    }

    function handleClear() {
        setSearch("");
        setImmutable("");
        setDiplomaId("");
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
                    <div className="relative">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title"
                            className="h-11 pr-10 text-sm"
                        />
                        <Search size={18} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* القوايم جنب بعض، كل واحدة 320 بكسل (فيجما) */}
                    <div className="flex gap-2">
                        {diplomaOptions && (
                            <NativeSelect
                                placeholder="Diploma"
                                options={diplomaOptions}
                                value={diplomaId}
                                onChange={(e) => setDiplomaId(e.target.value)}
                                className="w-80"
                            />
                        )}
                        <NativeSelect
                            placeholder="Immutability"
                            options={IMMUTABILITY_OPTIONS}
                            value={immutable}
                            onChange={(e) => setImmutable(e.target.value as FiltersValue["immutable"])}
                            className="w-80"
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
