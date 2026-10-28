import { useQuery } from "@tanstack/react-query";
import { getExamOptionsApi } from "../api/admin-exams.api";

// قايمة الامتحانات جاهزة لأي select، زي useDiplomaOptions بالظبط
export function useExamOptions() {
    return useQuery({
        queryKey: ["exam-options"],
        queryFn: getExamOptionsApi,
        select: (exams) => exams.map((exam) => ({ value: exam.id, label: exam.title })),
    });
}
