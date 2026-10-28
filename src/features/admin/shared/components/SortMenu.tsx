import { ArrowDownWideNarrow } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { SortOption, SortValue } from "@/features/admin/shared/types";

type Props = {
    // options: كل جدول بيبعت الاختيارات بتاعته، وموجودين في ملف sort-options
    options: SortOption[];
    value: SortValue;
    onChange: (value: SortValue) => void;
    // textClassName: لون كلمة Sort، أبيض على الهيدر الأزرق، وغامق على الصف الرمادي
    textClassName?: string;
};

// كلمة Sort اللي في هيدر الجدول الأزرق، ولما تدوس عليها بتفتح الاختيارات
export default function SortMenu({ options, value, onChange, textClassName = "text-white" }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium outline-none ${textClassName}`}>
                Sort
                <ArrowDownWideNarrow size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 rounded-none border-0 bg-background p-0 shadow-lg ring-0">
                {options.map((option) => {
                    // Icon: بنحط الأيقونة في متغير بحرف كبير عشان نقدر نكتبها كتاج
                    const Icon = option.icon;
                    const isSelected = option.value.sortBy === value.sortBy && option.value.sortOrder === value.sortOrder;

                    return (
                        <DropdownMenuItem
                            key={option.value.sortBy + option.value.sortOrder}
                            onClick={() => onChange(option.value)}
                            className={`cursor-pointer gap-2.5 rounded-none px-3 py-2.5 text-sm font-mono text-gray-800 focus:bg-accent focus:text-gray-800 ${
                                isSelected ? "bg-accent" : ""
                            }`}
                        >
                            <Icon size={16} className="text-gray-500!" />
                            {option.label}
                            <span className="text-xs text-gray-400">({option.hint})</span>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>  
        </DropdownMenu>
    );
}
