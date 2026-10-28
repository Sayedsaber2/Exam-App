import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { Question } from "@/features/questions/types";

// نص السؤال في الشريط الأبيض، وتحته لينك الامتحان بتاعه (فيجما)
export default function QuestionHeading({ question }: { question?: Question }) {
    if (!question) return <div />;

    return (
        <div className="min-w-0">
            <h1 className="truncate font-inter text-lg font-semibold text-foreground">{question.text}</h1>
            {question.exam && (
                <p className="font-inter text-sm text-gray-400">
                    Exam:{" "}
                    <Link to={`/admin/exams/${question.exam.id}`} className="inline-flex items-center gap-1 underline hover:text-primary">
                        {question.exam.title}
                        <ExternalLink size={12} />
                    </Link>
                </p>
            )}
        </div>
    );
}
