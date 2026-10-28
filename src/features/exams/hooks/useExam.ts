import { useQuery } from "@tanstack/react-query";
import { getExamApi } from "../api/exams.api";

export function useExam(id: string) {
    return useQuery({ queryKey: ["exam", id], queryFn: () => getExamApi(id) })

} 