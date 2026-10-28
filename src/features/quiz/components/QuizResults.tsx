import { useNavigate } from "react-router-dom";
import { Compass, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import type { SubmitExamResult } from "@/features/submissions/types";
import QuizProgress from "./QuizProgress";
import ResultDonut from "./ResultDonut";
import ResultQuestion from "./ResultQuestion";

type Props = {
    result: SubmitExamResult;
    label: string;
    onRestart: () => void;
};

export default function QuizResults({ result, label, onRestart }: Props) {
    const navigate = useNavigate();
    const { submission, analytics } = result;

    // الأسئلة اللي اتسابت من غير إجابة بتتحسب غلط — فالغلط = الكل ناقص الصح
    const incorrect = submission.totalQuestions - submission.correctAnswers;

    return (
        <div className="bg-background p-6 font-mono">
            {/* نفس السطر العلوي بس الشريط كامل */}
            <QuizProgress label={label} current={submission.totalQuestions} total={submission.totalQuestions} />

            <h2 className="mt-12 text-2xl font-bold text-primary">Results:</h2>

            <div className="mt-4 flex gap-5">
                {/* الكارت الشمال: الدونات + المفتاح */}
                <div className="flex w-68 shrink-0 flex-col items-center justify-center border border-blue-100 bg-blue-50 p-6">
                    <ResultDonut correct={submission.correctAnswers} total={submission.totalQuestions} />
                    <div className="mt-10 flex flex-col gap-3 text-sm font-medium text-foreground">
                        <p className="flex items-center gap-2.5">
                            <span className="size-4 bg-emerald-500" />
                            Correct: {submission.correctAnswers}
                        </p>
                        <p className="flex items-center gap-2.5">
                            <span className="size-4 bg-red-500" />
                            Incorrect: {incorrect}
                        </p>
                    </div>
                </div>

                {/* القايمة اليمين: بتسكرول لوحدها والكارت ثابت — زي فيجما */}
                <div className="flex max-h-150 min-w-0 flex-1 flex-col gap-6 overflow-y-auto border-l border-dashed border-primary pl-3">
                    {analytics.map((analytic) => (
                        <ResultQuestion key={analytic.questionId} analytic={analytic} />
                    ))}
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                <Button variant="secondary" className="h-11 flex-1 bg-gray-200 text-foreground" onClick={onRestart}>
                    <RotateCcw />
                    Restart
                </Button>
                <Button className="h-11 flex-1" onClick={() => navigate("/")}>
                    <Compass />
                    Explore
                </Button>
            </div>
        </div>
    );
}
