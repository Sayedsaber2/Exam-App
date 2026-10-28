import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Plus } from "lucide-react";
import type { Question } from "@/features/questions/types";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";
import RowActions from "@/features/admin/shared/components/RowActions";
import SortMenu from "@/features/admin/shared/components/SortMenu";
import { QUESTION_SORT_OPTIONS } from "@/features/admin/shared/sort-options";
import { useAdminQuestions } from "../hooks/useAdminQuestions";
import { useDeleteQuestion } from "../hooks/useDeleteQuestion";
import type { QuestionsSort } from "../types";

type Props = {
    examId: string;
    isSuperAdmin: boolean;
};

// كارت "Exam Questions" اللي تحت صفحة عرض الامتحان (فيجما)
export default function QuestionsCard({ examId, isSuperAdmin }: Props) {
    // sort: ترتيب الأسئلة، والأقدم الأول زي ما اتضافوا
    const [sort, setSort] = useState<QuestionsSort>({ sortBy: "createdAt", sortOrder: "asc" });
    const { data: questions, isLoading } = useAdminQuestions(examId, sort);

    // toDelete: السؤال اللي دسنا على حذفه، ولو فاضي يبقى المودال مقفول
    const [toDelete, setToDelete] = useState<Question | null>(null);
    const remove = useDeleteQuestion();

    function confirmDelete() {
        if (!toDelete) return;
        remove.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
    }

    return (
        <div className="bg-background">
            <div className="flex h-10 items-center justify-between bg-primary px-4 text-white">
                <p className="font-medium">Exam Questions</p>
                <Link to={`/admin/questions/new?examId=${examId}`} className="flex items-center gap-2 hover:underline">
                    <Plus size={18} />
                    Add Questions
                </Link>
            </div>

            <div className="flex h-9 items-center justify-between bg-gray-200 px-4 text-sm text-gray-800">
                <span>Title</span>
                <SortMenu
                    options={QUESTION_SORT_OPTIONS}
                    value={sort}
                    onChange={(value) => setSort(value as QuestionsSort)}
                    textClassName="text-gray-800"
                />
            </div>

            {isLoading && <div className="h-25 animate-pulse bg-gray-50" />}

            {questions?.length === 0 && <p className="p-4 text-sm text-muted-foreground">No questions yet.</p>}

            {questions?.map((question) => (
                <div key={question.id} className="flex items-center gap-4 border-b border-gray-200 px-4 py-2.5 text-sm hover:bg-gray-50">
                    <p className="flex flex-1 items-center gap-1.5 text-gray-800">
                        {question.text}
                        {question.immutable && <Lock size={14} className="shrink-0 text-gray-400" />}
                    </p>
                    <RowActions
                        viewTo={`/admin/questions/${question.id}`}
                        editTo={`/admin/questions/${question.id}/edit`}
                        onDelete={() => setToDelete(question)}
                        locked={Boolean(question.immutable) && !isSuperAdmin}
                    />
                </div>
            ))}

            <ConfirmDeleteDialog
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) setToDelete(null);
                }}
                title="Are you sure you want to delete this question?"
                onConfirm={confirmDelete}
                isPending={remove.isPending}
                error={remove.error}
            />
        </div>
    );
}
