import { useCallback, useEffect, useRef, useState } from "react";
import type { Exam } from "@/features/exams/types";
import type { Question } from "@/features/questions/types";
import { useSubmitExam } from "@/features/submissions/hooks/useSubmitExam";
import { useCountdown } from "@/shared/hooks/useCountdown";

// كل منطق "حل الامتحان" في مكان واحد: السؤال الحالي، الإجابات، التايمر، والتسليم
export function useQuiz(exam: Exam, questions: Question[]) {
    // ---------- State: الحاجات اللي بتتغير وبتخلي الشاشة تتحدث ----------
    const [current, setCurrent] = useState(0);                          // index السؤال الحالي
    const [answers, setAnswers] = useState<Record<string, string>>({}); // { questionId: answerId }

    // ---------- Refs: قيم بتتحفظ بين الرندرات من غير ما تعمل رندر ----------
    const startedAt = useRef(new Date().toISOString()); // لحظة البداية — بتتحسب مرة واحدة بس
    const submittedRef = useRef(false);                 // قفل: منسلّمش مرتين

    const { secondsLeft } = useCountdown(exam.duration * 60); // الدقايق → ثواني
    const { mutate, data: result, isPending, isError, error } = useSubmitExam();

    // ---------- مشتقات: بتتحسب من الـ state كل رندر — مش state لوحدها ---------- 
    const question = questions[current];
    const selected = answers[question.id]; // undefined = لسه مجاوبش
    const isFirst = current === 0;
    const isLast = current === questions.length - 1;
    const answeredCount = Object.keys(answers).length;

    // ---------- أفعال ----------
    function select(answerId: string) {
        // [question.id] = computed key: اسم المفتاح هو قيمة المتغير
        setAnswers((prev) => ({ ...prev, [question.id]: answerId }));
    }

    function next() {
        if (!isLast) setCurrent((c) => c + 1);
    }

    function prev() {
        if (!isFirst) setCurrent((c) => c - 1);
    }

    // useCallback = نفس الفانكشن متتعملش من جديد إلا لو answers أو exam.id اتغيروا
    // (محتاجينها كده عشان الـ useEffect تحت يعتمد عليها)
    const submit = useCallback(() => {
        if (submittedRef.current) return; // اتسلّم خلاص؟ متعملش حاجة
        submittedRef.current = true;

        mutate(
            {
                examId: exam.id,
                // { q1: a1, q2: a2 } → [{ questionId: "q1", answerId: "a1" }, ...]
                answers: Object.entries(answers).map(([questionId, answerId]) => ({ questionId, answerId })),
                startedAt: startedAt.current,
            },
            { onError: () => (submittedRef.current = false) }, // فشل؟ افتح القفل عشان يقدر يحاول تاني
        );
    }, [answers, exam.id, mutate]);

    // الوقت خلص → سلّم لوحدك
    useEffect(() => {
        if (secondsLeft === 0) submit();
    }, [secondsLeft, submit]);

    return {
        question,
        current,
        total: questions.length,
        selected,
        answeredCount,
        isFirst,
        isLast,
        secondsLeft,
        select,
        next,
        prev,
        submit,
        result,
        isPending,
        isError,
        error,
    };
}
