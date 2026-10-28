import type { QueryClient } from "@tanstack/react-query";

// بعد أي تغيير في الأسئلة، دول كل الأماكن اللي بتعرضها أو بتعرض عددها
export function invalidateQuestions(queryClient: QueryClient) {
    // admin-questions: كارت الأسئلة في صفحة عرض الامتحان
    queryClient.invalidateQueries({ queryKey: ["admin-questions"] });
    // questions: الأسئلة اللي الطالب بيحلها في الكويز
    queryClient.invalidateQueries({ queryKey: ["questions"] });
    // question: صفحة عرض سؤال واحد
    queryClient.invalidateQueries({ queryKey: ["question"] });
    // exam و admin-exams: عشان عدد الأسئلة اللي ظاهر فيهم يتغير
    queryClient.invalidateQueries({ queryKey: ["exam"] });
    queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
}
