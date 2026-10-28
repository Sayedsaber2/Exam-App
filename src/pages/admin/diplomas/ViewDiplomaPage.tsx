import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Ban, LockOpen, PencilLine, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useProfile } from "@/features/account/hooks/useProfile";
import { useDiploma } from "@/features/diplomas/hooks/useDiploma";
import { useDeleteDiploma } from "@/features/admin/diplomas/hooks/useDeleteDiploma";
import { useSetDiplomaImmutable } from "@/features/admin/diplomas/hooks/useSetDiplomaImmutable";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";

// كلاس الزراير التلاتة اللي فوق: 40px ارتفاع (فيجما)
const BUTTON = "flex h-10 cursor-pointer items-center gap-2 px-4 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export default function ViewDiplomaPage() {
    const { diplomaId = "" } = useParams();
    const navigate = useNavigate();
    const { data: user } = useProfile();
    const { data: diploma, isError, error } = useDiploma(diplomaId);
    const remove = useDeleteDiploma();
    const lock = useSetDiplomaImmutable();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const isSuperAdmin = isSuperAdminRole(user?.role);
    // مقفولة وإنت مش سوبر أدمن: التعديل والحذف مقفولين
    const locked = Boolean(diploma?.immutable) && !isSuperAdmin;

    function handleDelete() {
        // بعد الحذف، الصفحة دي مبقاش ليها لازمة، ارجع للجدول
        remove.mutate(diplomaId, { onSuccess: () => navigate("/admin/diplomas") });
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Diplomas", to: "/admin/diplomas" }, { label: diploma?.title ?? "..." }]}>
                <h1 className="font-inter text-lg font-semibold  text-foreground">{diploma?.title}</h1>

                {diploma && (
                    <div className="flex gap-2.5 font-mono">
                        {/* القفل: يظهر للسوبر أدمن بس */}
                        {isSuperAdmin && (
                            <button
                                type="button"
                                disabled={lock.isPending}
                                onClick={() => lock.mutate({ id: diplomaId, immutable: !diploma.immutable })}
                                className={`${BUTTON} bg-gray-200 text-gray-800 hover:bg-gray-300`}
                            >
                                {diploma.immutable ? <LockOpen size={18} /> : <Ban size={18} />}
                                {diploma.immutable ? "Mutable" : "Immutable"}
                            </button>
                        )}

                        {locked ? (
                            <button type="button" disabled className={`${BUTTON} bg-primary text-white`}>
                                <PencilLine size={18} />
                                Edit
                            </button>
                        ) : (
                            <Link to={`/admin/diplomas/${diplomaId}/edit`} className={`${BUTTON} bg-primary text-white hover:bg-primary/90`}>
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

            <div className="p-6 font-mono">
                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {diploma ? (
                    <div className="flex flex-col gap-4 bg-background p-4 text-sm">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-gray-400">Image</p>
                            {diploma.image ? (
                                <img src={diploma.image} alt={diploma.title} className="size-75 object-cover" />
                            ) : (
                                <p className="text-gray-500">No image</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400">Title</p>
                            <p className="text-gray-800">{diploma.title}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-gray-400">Description</p>
                            <p className="leading-relaxed text-gray-800">{diploma.description || "No description"}</p>
                        </div>
                    </div>
                ) : (
                    !isError && <div className="h-96 animate-pulse bg-background" />
                )}
            </div>

            <ConfirmDeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Are you sure you want to delete this diploma?"
                onConfirm={handleDelete}
                isPending={remove.isPending}
                error={remove.error}
            />
        </>
    );
}
