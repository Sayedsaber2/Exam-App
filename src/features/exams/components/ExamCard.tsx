import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, CircleQuestionMark, Timer } from "lucide-react";
import type { Exam } from "../types";

export default function ExamCard({ exam }: { exam: Exam }) {
    return (
        // group = عشان الأولاد يقدروا يسمعوا الهوفر بتاع الكارت · relative = عشان START يتحدد مكانه بالنسبة للكارت
        <div className="group relative flex gap-3 bg-blue-50 p-3 sm:gap-4 sm:p-4">
            {/* صندوق الصورة: أبيض ببوردر — ولو الامتحان ملوش صورة، أيقونة بدالها */}
            {/* size-20: أصغر شوية على الموبايل، و sm:size-25 زي فيجما */}
            <div className="flex size-20 shrink-0 items-center justify-center border border-primary bg-blue-100 p-2 sm:size-25">
                {exam.image ? (
                    <img src={exam.image} alt={exam.title} loading="lazy" className="size-full object-contain" />
                ) : (
                    <BookOpenCheck size={28} className="text-primary" />
                )}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
                {/* الموبايل: عدد الأسئلة والمدة تحت العنوان، ومن أول sm جنبه على اليمين */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <p className="text-base font-medium text-primary sm:text-lg">{exam.title}</p>

                    <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-800">
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            <CircleQuestionMark size={16} />
                            {exam.questionsCount} Questions
                        </span>
                        {/* العصاية */}
                        <span className="h-4 w-px bg-gray-300" />
                        <span className="flex items-center gap-1 whitespace-nowrap">
                            <Timer size={16} />
                            {exam.duration} minutes
                        </span>
                    </div>
                </div>

                {/* lg:pr-28 = مساحة فاضية على اليمين عشان النص ميدخلش تحت زرار START */}
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground lg:pr-28">{exam.description}</p>

                {/* START على الموبايل والتابلت: ظاهر على طول تحت الوصف، لأن مفيش هوفر في اللمس */}
                {/* START من أول lg: في الركن تحت يمين، ومخفي وبيظهر على الهوفر أو بالكيبورد (focus) زي فيجما */}
                <Link
                    to={`/exams/${exam.id}`}
                    className="mt-2 inline-flex items-center gap-2 bg-primary px-5 py-2 text-sm text-primary-foreground transition-opacity lg:absolute lg:right-4 lg:bottom-4 lg:mt-0 lg:opacity-0 lg:group-hover:opacity-100 lg:focus:opacity-100"
                >
                    START
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
}
