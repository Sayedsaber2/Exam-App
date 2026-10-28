import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, CircleQuestionMark, Timer } from "lucide-react";
import type { Exam } from "../types";

export default function ExamCard({ exam }: { exam: Exam }) {
    return (
        // group = عشان الأولاد يقدروا يسمعوا الهوفر بتاع الكارت · relative = عشان START يتحدد مكانه بالنسبة للكارت
        <div className="group relative flex gap-4 bg-blue-50 p-4">
            {/* صندوق الصورة: أبيض ببوردر — ولو الامتحان ملوش صورة، أيقونة بدالها */}
            <div className="flex size-25 shrink-0 items-center justify-center border border-primary bg-blue-100 p-2">
                {exam.image ? (
                    <img src={exam.image} alt={exam.title} loading="lazy" className="size-full object-contain" />
                ) : (
                    <BookOpenCheck size={28} className="text-primary" />
                )}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-4">
                    <p className="text-lg font-medium text-primary">{exam.title}</p>

                    <div className="flex shrink-0 items-center gap-3 text-sm text-gray-800">
                        <span className="flex items-center gap-1">
                            <CircleQuestionMark size={16} />
                            {exam.questionsCount} Questions
                        </span>
                        {/* العصاية */}
                        <span className="h-4 w-px bg-gray-300" />
                        <span className="flex items-center gap-1">
                            <Timer size={16} />
                            {exam.duration} minutes
                        </span>
                    </div>
                </div>

                {/* pr-28 = مساحة فاضية على اليمين عشان النص ميدخلش تحت زرار START */}
                <p className="line-clamp-2 pr-28 text-sm leading-relaxed text-muted-foreground">{exam.description}</p>
            </div>

            {/* START: في الركن تحت يمين · مخفي (opacity-0) وبيظهر على الهوفر — وبالكيبورد كمان (focus) */}
            <Link
                to={`/exams/${exam.id}`}
                className="absolute right-4 bottom-4 flex items-center gap-2 bg-primary px-5 py-2 text-sm text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            >
                START
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}
