import { BookOpenCheck, Lock } from "lucide-react";
import type { Exam } from "@/features/exams/types";
import type { SortValue } from "@/features/admin/shared/types";
import { EXAM_SORT_OPTIONS } from "@/features/admin/shared/sort-options";
import RowActions from "@/features/admin/shared/components/RowActions";
import SortMenu from "@/features/admin/shared/components/SortMenu";

type Props = {
    exams: Exam[];
    sort: SortValue;
    onSortChange: (value: SortValue) => void;
    onDelete: (exam: Exam) => void;
    isSuperAdmin: boolean;
};

// جدول الامتحانات: نفس جدول الدبلومات، بس فيه عمود الدبلومة وعدد الأسئلة بدل الوصف (فيجما)
export default function ExamsTable({ exams, sort, onSortChange, onDelete, isSuperAdmin }: Props) {
    return (
        <table className="w-full bg-background text-left text-sm">
            <thead className="bg-primary text-white">
                <tr className="h-9">
                    <th className="w-29 px-4 font-medium">Image</th>
                    <th className="px-4 font-medium">Title</th>
                    <th className="w-50 px-4 font-medium">Diploma</th>
                    <th className="w-44 px-4 font-medium whitespace-nowrap">No. of Questions</th>
                    <th className="w-24 px-4 text-right">
                        <SortMenu options={EXAM_SORT_OPTIONS} value={sort} onChange={onSortChange} />
                    </th>
                </tr>
            </thead>

            <tbody>
                {exams.map((exam) => {
                    // locked: مقفول وإنت مش سوبر أدمن، فالتعديل والحذف مقفولين
                    const locked = exam.immutable && !isSuperAdmin;

                    return (
                        <tr key={exam.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                            <td className="px-4 py-2.5">
                                {/* لو الامتحان ملوش صورة، أيقونة بدلها زي صفحة اليوزر */}
                                {exam.image ? (
                                    <img src={exam.image} alt={exam.title} className="h-20 w-17.5 object-cover" />
                                ) : (
                                    <div className="flex h-20 w-17.5 items-center justify-center bg-gray-50">
                                        <BookOpenCheck size={24} className="text-gray-300" />
                                    </div>
                                )}
                            </td>

                            <td className="px-4">
                                <div className="flex items-center gap-1.5" title={exam.title}>
                                    <span className="line-clamp-2 text-gray-800">{exam.title}</span>
                                    {exam.immutable && <Lock size={14} className="shrink-0 text-gray-400" />}
                                </div>
                            </td>

                            <td className="px-4">
                                {/* truncate: سطر واحد وآخره نقط، ولو وقفت عليه يظهر الاسم كامل */}
                                <p className="max-w-42 truncate text-gray-800" title={exam.diploma?.title}>
                                    {exam.diploma?.title ?? "—"}
                                </p>
                            </td>

                            <td className="px-4 text-gray-800">{exam.questionsCount}</td>

                            <td className="px-4 text-right">
                                <RowActions
                                    viewTo={`/admin/exams/${exam.id}`}
                                    editTo={`/admin/exams/${exam.id}/edit`}
                                    addQuestionsTo={`/admin/questions/new?examId=${exam.id}`}
                                    onDelete={() => onDelete(exam)}
                                    locked={locked}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
