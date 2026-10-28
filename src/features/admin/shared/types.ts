import type { LucideIcon } from "lucide-react";

// الترتيب اللي بيتبعت للسيرفر، زي sortBy=title&sortOrder=asc
export interface SortValue {
    sortBy: string;
    sortOrder: "asc" | "desc";
}

// اختيار واحد في قايمة Sort
export interface SortOption {
    label: string;
    hint: "ascending" | "descending";
    icon: LucideIcon;
    value: SortValue;
}

// قيم كارت البحث: كلها نصوص زي ما بتيجي من الخانات
export interface FiltersValue {
    search: string;
    // immutable: الفاضي معناه الكل
    immutable: "" | "true" | "false";
    // diplomaId: في صفحة الامتحانات بس، والفاضي معناه كل الدبلومات
    diplomaId?: string;
}
