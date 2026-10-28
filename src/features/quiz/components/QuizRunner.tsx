import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { Exam } from "@/features/exams/types";
import type { Question } from "@/features/questions/types";
import { Button } from "@/components/ui/button/button";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useQuiz } from "../hooks/useQuiz";
import AnswerOption from "./AnswerOption";
import QuizProgress from "./QuizProgress";
import QuizResults from "./QuizResults";
import QuizTimer from "./QuizTimer";

type Props = {
    exam: Exam;
    questions: Question[];
    onRestart: () => void;
};

export default function QuizRunner({ exam, questions, onRestart }: Props) {
    const quiz = useQuiz(exam, questions);

    // "Frontend Development - CSS Quiz" — ولو الدبلومة مش موجودة يبقى اسم الامتحان بس
    const label = [exam.diploma?.title, exam.title].filter(Boolean).join(" - ");

    // اتسلّم ورجعت النتيجة → شاشة النتيجة بدل الأسئلة
    if (quiz.result) {
        return <QuizResults result={quiz.result} label={label} onRestart={onRestart} />;
    }

    return (
        <div className="bg-background p-6 *:font-mono">
            {/* السطر العلوي: التقدم | عصاية | التايمر */}
            <div className="flex items-center gap-6">
                <QuizProgress label={label} current={quiz.current + 1} total={quiz.total} />
                <span className="h-16 w-px bg-gray-200" />
                <QuizTimer secondsLeft={quiz.secondsLeft} totalSeconds={exam.duration * 60} />
            </div>

            <h2 className="mt-10 text-2xl font-bold text-primary">{quiz.question.text}</h2>

            {/* radiogroup = للـ screen reader: "دول اختيارات من بينها واحد" */}
            <div role="radiogroup" aria-label="Answers" className="mt-5 flex flex-col gap-3">
                {quiz.question.answers.map((answer) => (
                    <AnswerOption
                        key={answer.id}
                        text={answer.text}
                        checked={quiz.selected === answer.id}
                        onSelect={() => quiz.select(answer.id)}
                    />
                ))}
            </div>

            {quiz.isError && (
                <div className="mt-6">
                    <ErrorAlert message={getErrorMessage(quiz.error)} />
                </div>
            )}

            <div className="mt-10 flex gap-4">
                <Button
                    variant="secondary"
                    className="h-11 flex-1 bg-gray-200 text-foreground"
                    onClick={quiz.prev}
                    disabled={quiz.isFirst}
                >
                    <ChevronLeft />
                    Previous
                </Button>

                {quiz.isLast ? (
                    <Button className="h-11 flex-1" onClick={quiz.submit} disabled={quiz.isPending}>
                        {quiz.isPending && <Loader2 className="animate-spin" />}
                        Submit
                    </Button>
                ) : (
                    <Button className="h-11 flex-1" onClick={quiz.next}>
                        Next
                        <ChevronRight />
                    </Button>
                )}
            </div>
        </div>
    );
}
