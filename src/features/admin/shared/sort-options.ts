import { ArrowDown10, ArrowDownZA, ArrowUp01, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import type { SortOption } from "@/features/admin/shared/types";

// اختيارات الترتيب في جدول الدبلومات (فيجما)
export const DIPLOMA_SORT_OPTIONS: SortOption[] = [
    { label: "Title", hint: "descending", icon: ArrowDownZA, value: { sortBy: "title", sortOrder: "desc" } },
    { label: "Title", hint: "ascending", icon: ArrowUpAZ, value: { sortBy: "title", sortOrder: "asc" } },
    { label: "Newest", hint: "descending", icon: CalendarArrowDown, value: { sortBy: "createdAt", sortOrder: "desc" } },
    { label: "Newest", hint: "ascending", icon: CalendarArrowUp, value: { sortBy: "createdAt", sortOrder: "asc" } },
];

// الامتحانات: نفس اللي فوق، وزيادة عليهم عدد الأسئلة (فيجما)
export const EXAM_SORT_OPTIONS: SortOption[] = [
    DIPLOMA_SORT_OPTIONS[0],
    DIPLOMA_SORT_OPTIONS[1],
    { label: "Questions No.", hint: "descending", icon: ArrowDown10, value: { sortBy: "questions", sortOrder: "desc" } },
    { label: "Questions No.", hint: "ascending", icon: ArrowUp01, value: { sortBy: "questions", sortOrder: "asc" } },
    DIPLOMA_SORT_OPTIONS[2],
    DIPLOMA_SORT_OPTIONS[3],
];

// الأسئلة: نفس اختيارات الدبلومات (بالاسم أو بالتاريخ)
export const QUESTION_SORT_OPTIONS = DIPLOMA_SORT_OPTIONS;

// سجل التغييرات: بالأكشن، أو باليوزر، أو بنوع الحاجة، أو بالتاريخ (فيجما)
export const AUDIT_LOG_SORT_OPTIONS: SortOption[] = [
    { label: "Action", hint: "descending", icon: ArrowDownZA, value: { sortBy: "action", sortOrder: "desc" } },
    { label: "Action", hint: "ascending", icon: ArrowUpAZ, value: { sortBy: "action", sortOrder: "asc" } },
    { label: "User", hint: "descending", icon: ArrowDownZA, value: { sortBy: "user", sortOrder: "desc" } },
    { label: "User", hint: "ascending", icon: ArrowUpAZ, value: { sortBy: "user", sortOrder: "asc" } },
    { label: "Entity", hint: "descending", icon: ArrowDownZA, value: { sortBy: "entity", sortOrder: "desc" } },
    { label: "Entity", hint: "ascending", icon: ArrowUpAZ, value: { sortBy: "entity", sortOrder: "asc" } },
    DIPLOMA_SORT_OPTIONS[2],
    DIPLOMA_SORT_OPTIONS[3],
];
