import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { Exam } from "@/features/exams/types";

// عنوان الامتحان في الشريط الأبيض، وتحته لينك الدبلومة بتاعته (فيجما)
export default function ExamHeading({ exam }: { exam?: Exam }) {
    if (!exam) return <div />;

    return (
        <div className="min-w-0 ">
            <h1 className="truncate font-inter text-lg font-semibold text-foreground">{exam.title}</h1>
            {exam.diploma && (
                <p className="font-inter text-sm text-gray-400">
                    Diploma:{" "}
                    <Link to={`/admin/diplomas/${exam.diploma.id}`} className="inline-flex items-center gap-1 underline hover:text-primary">
                        {exam.diploma.title}
                        <ExternalLink size={12} />
                    </Link>
                </p>
            )}
        </div>
    );
}
