import type { QuestionAnalytic } from "@/features/submissions/types";
import { cn } from "@/shared/lib/tailwind-merge";

type RowProps = {
    text: string;
    tone: "correct" | "wrong";
    filled: boolean; // نقطة جوه الدايرة = دي اللي المستخدم اختارها
};

function ResultRow({ text, tone, filled }: RowProps) {
    const ok = tone === "correct";

    return (
        <div className={cn("flex h-12 items-center gap-2.5 px-4 text-sm text-gray-800", ok ? "bg-emerald-50" : "bg-red-50")}>
            <span
                className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border",
                    ok ? "border-emerald-500" : "border-red-500",
                )}
            >
                {filled && <span className={cn("size-2 rounded-full", ok ? "bg-emerald-500" : "bg-red-500")} />}
            </span>
            {text}
        </div>
    );
}

// سؤال واحد في النتيجة: إجابة المستخدم (مليانة) + الإجابة الصح لو كان غلط (فاضية)
export default function ResultQuestion({ analytic }: { analytic: QuestionAnalytic }) {
    const { questionText, selectedAnswer, correctAnswer, isCorrect } = analytic;

    return (
        <div>
            <h3 className="text-xl font-bold text-primary">{questionText}</h3>
            <div className="mt-3 flex flex-col gap-3">
                <ResultRow text={selectedAnswer?.text ?? "Not answered"} tone={isCorrect ? "correct" : "wrong"} filled />
                {!isCorrect && correctAnswer && <ResultRow text={correctAnswer.text} tone="correct" filled={false} />}
            </div>
        </div>
    );
}
