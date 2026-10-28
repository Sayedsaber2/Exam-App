import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Ban, CheckCheck, ExternalLink, LockOpen, PencilLine, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useProfile } from "@/features/account/hooks/useProfile";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";
import QuestionHeading from "@/features/admin/questions/components/QuestionHeading";
import { useDeleteQuestion } from "@/features/admin/questions/hooks/useDeleteQuestion";
import { useQuestion } from "@/features/admin/questions/hooks/useQuestion";
import { useSetQuestionImmutable } from "@/features/admin/questions/hooks/useSetQuestionImmutable";

// BUTTON: نفس زراير صفحات العرض التانية
const BUTTON = "flex h-10 cursor-pointer items-center gap-2 px-4 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export default function ViewQuestionPage() {
    const { questionId = "" } = useParams();
    const navigate = useNavigate();
    const { data: user } = useProfile();
    const { data: question, isError, error } = useQuestion(questionId);
    const remove = useDeleteQuestion();
    const lock = useSetQuestionImmutable();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const isSuperAdmin = isSuperAdminRole(user?.role);
    const locked = Boolean(question?.immutable) && !isSuperAdmin;
    const examPath = `/admin/exams/${question?.examId ?? ""}`;

    function handleDelete() {
        // بعد الحذف، ارجع لصفحة الامتحان
        remove.mutate(questionId, { onSuccess: () => navigate(examPath) });
    }

    return (
        <>
            <AdminPageHeader
                crumbs={[
                    { label: "Exams", to: "/admin/exams" },
                    { label: question?.exam?.title ?? "...", to: examPath },
                    { label: "Questions", to: examPath },
                    { label: question?.text ?? "..." },
                ]}
            >
                <QuestionHeading question={question} />

                {question && (
                    <div className="flex shrink-0 gap-2.5">
                        {isSuperAdmin && (
                            <button
                                type="button"
                                disabled={lock.isPending}
                                onClick={() => lock.mutate({ id: questionId, immutable: !question.immutable })}
                                className={`${BUTTON} bg-gray-200 text-gray-800 hover:bg-gray-300`}
                            >
                                {question.immutable ? <LockOpen size={18} /> : <Ban size={18} />}
                                {question.immutable ? "Mutable" : "Immutable"}
                            </button>
                        )}

                        {locked ? (
                            <button type="button" disabled className={`${BUTTON} bg-primary text-white`}>
                                <PencilLine size={18} />
                                Edit
                            </button>
                        ) : (
                            <Link to={`/admin/questions/${questionId}/edit`} className={`${BUTTON} bg-primary text-white hover:bg-primary/90`}>
                                <PencilLine size={18} />
                                Edit
                            </Link>
                        )}

                        <button
                            type="button"
                            disabled={locked}
                            onClick={() => setDeleteOpen(true)}
                            className={`${BUTTON} bg-destructive text-white hover:bg-destructive/90`}
                        >
                            <Trash2 size={18} />
                            Delete
                        </button>
                    </div>
                )}
            </AdminPageHeader>

            <div className="p-6">
                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {question ? (
                    <div className="flex flex-col gap-4 bg-background p-4 text-sm">
                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400">Headline</p>
                            <p className="text-gray-800">{question.text}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400">Exam</p>
                            {question.exam ? (
                                <Link to={examPath} className="inline-flex w-fit items-center gap-1.5 text-gray-800 hover:text-primary">
                                    {question.exam.title}
                                    <ExternalLink size={14} />
                                </Link>
                            ) : (
                                <p className="text-gray-800">—</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <p className="text-gray-400">Answers</p>
                            {/* عدد الإجابات زي فيجما بالظبط */}
                            <p className="text-gray-800">{question.answers.length}</p>
                            {/* وتحته الإجابات نفسها، والصح خضرا وجنبها علامة صح */}
                            {question.answers.map((answer) => (
                                <p
                                    key={answer.id}
                                    className={`flex items-center gap-2 px-3 py-2.5 ${answer.isCorrect ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-800"}`}
                                >
                                    {answer.text}
                                    {answer.isCorrect && <CheckCheck size={16} /> }
                                    
                                </p>
                            ))}
                        </div>
                    </div>
                ) : (
                    !isError && <div className="h-96 animate-pulse bg-background" />
                )}
            </div>

            <ConfirmDeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Are you sure you want to delete this question?"
                onConfirm={handleDelete}
                isPending={remove.isPending}
                error={remove.error}
            />
        </>
    );
}
