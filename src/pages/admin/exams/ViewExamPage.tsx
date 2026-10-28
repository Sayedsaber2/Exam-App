import { useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Ban, ExternalLink, LockOpen, PencilLine, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useProfile } from "@/features/account/hooks/useProfile";
import { useExam } from "@/features/exams/hooks/useExam";
import { useDeleteExam } from "@/features/admin/exams/hooks/useDeleteExam";
import { useSetExamImmutable } from "@/features/admin/exams/hooks/useSetExamImmutable";
import QuestionsCard from "@/features/admin/questions/components/QuestionsCard";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";
import ExamHeading from "@/features/admin/exams/components/ExamHeading";

// BUTTON: كلاس الزراير التلاتة اللي فوق، نفس صفحة عرض الدبلومة
const BUTTON = "flex h-10 cursor-pointer items-center gap-2 px-4 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export default function ViewExamPage() {
    const { examId = "" } = useParams();
    const navigate = useNavigate();
    const { data: user } = useProfile();
    const { data: exam, isError, error } = useExam(examId);
    const remove = useDeleteExam();
    const lock = useSetExamImmutable();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const isSuperAdmin = isSuperAdminRole(user?.role);
    // locked: مقفول وإنت مش سوبر أدمن
    const locked = Boolean(exam?.immutable) && !isSuperAdmin;

    function handleDelete() {
        remove.mutate(examId, { onSuccess: () => navigate("/admin/exams") });
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Exams", to: "/admin/exams" }, { label: exam?.title ?? "..." }]}>
                <ExamHeading exam={exam} />

                {exam && (
                    <div className="flex shrink-0 gap-2.5">
                        {isSuperAdmin && (
                            <button
                                type="button"
                                disabled={lock.isPending}
                                onClick={() => lock.mutate({ id: examId, immutable: !exam.immutable })}
                                className={`${BUTTON} bg-gray-200 text-gray-800 hover:bg-gray-300`}
                            >
                                {exam.immutable ? <LockOpen size={18} /> : <Ban size={18} />}
                                {exam.immutable ? "Mutable" : "Immutable"}
                            </button>
                        )}

                        {locked ? (
                            <button type="button" disabled className={`${BUTTON} bg-primary text-white`}>
                                <PencilLine size={18} />
                                Edit
                            </button>
                        ) : (
                            <Link to={`/admin/exams/${examId}/edit`} className={`${BUTTON} bg-primary text-white hover:bg-primary/90`}>
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

            <div className="flex flex-col gap-6 p-6">
                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {/* كارت البيانات */}
                {exam ? (
                    <div className="flex flex-col gap-4 bg-background p-4 text-sm font-mono">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-gray-400">Image</p>
                            {exam.image ? (
                                <img src={exam.image} alt={exam.title} className="size-75 object-cover" />
                            ) : (
                                <p className="text-gray-500">No image</p>
                            )}
                        </div>

                        <Info label="Title">{exam.title}</Info>
                        <Info label="Description">{exam.description || "No description"}</Info>
                        <Info label="Diploma">
                            {exam.diploma ? (
                                <Link to={`/admin/diplomas/${exam.diploma.id}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                                    {exam.diploma.title}
                                    <ExternalLink size={14} />
                                </Link>
                            ) : (
                                "—"
                            )}
                        </Info>
                        <Info label="Duration">{exam.duration} Minutes</Info>
                        <Info label="No. of Questions">{exam.questionsCount}</Info>
                    </div>
                ) : (
                    !isError && <div className="h-96 animate-pulse bg-background" />
                )}

                {/* كارت الأسئلة: الإضافة والترتيب والعرض والتعديل والحذف */}
                <div className="font-mono">
                    <QuestionsCard examId={examId} isSuperAdmin={isSuperAdmin} />
                </div>
            </div>

            <ConfirmDeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Are you sure you want to delete this exam?"
                onConfirm={handleDelete}
                isPending={remove.isPending}
                error={remove.error}
            />
        </>
    );
}

// Info: سطر بيانات واحد، العنوان رمادي والقيمة تحته
function Info({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-gray-400">{label}</p>
            <div className="leading-relaxed text-gray-800">{children}</div>
        </div>
    );
}
