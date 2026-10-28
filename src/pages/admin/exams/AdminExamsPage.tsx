import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useProfile } from "@/features/account/hooks/useProfile";
import { useDiplomaOptions } from "@/features/admin/diplomas/hooks/useDiplomaOptions";
import { useAdminExams } from "@/features/admin/exams/hooks/useAdminExams";
import { useDeleteExam } from "@/features/admin/exams/hooks/useDeleteExam";
import type { Exam } from "@/features/exams/types";
import type { ExamsQuery } from "@/features/admin/exams/types";
import AdminPagination from "@/features/admin/shared/components/AdminPagination";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";
import ExamsTable from "@/features/admin/exams/components/ExamsTable";
import SearchFilters from "@/features/admin/shared/components/SearchFilters";
import TableSkeleton from "@/features/admin/shared/components/TableSkeleton";
import type { FiltersValue } from "@/features/admin/shared/types";

// نفس صفحة جدول الدبلومات بالظبط، وزيادة عليها فلتر الدبلومة
export default function AdminExamsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: user } = useProfile();
    const { data: diplomaOptions } = useDiplomaOptions();

    // ---------- اقرا من الـ URL ----------
    const page = Number(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? "";
    const diplomaId = searchParams.get("diplomaId") ?? "";
    const immutable = (searchParams.get("immutable") ?? "") as FiltersValue["immutable"];
    const sortBy = (searchParams.get("sortBy") ?? "createdAt") as NonNullable<ExamsQuery["sortBy"]>;
    const sortOrder = (searchParams.get("sortOrder") ?? "desc") as NonNullable<ExamsQuery["sortOrder"]>;

    // ---------- حوّلهم للشكل اللي السيرفر عايزه ----------
    const query: ExamsQuery = {
        page,
        search: search || undefined,
        diplomaId: diplomaId || undefined,
        immutable: immutable === "" ? undefined : immutable === "true",
        sortBy,
        sortOrder,
    };

    const { data, isLoading, isError, error, isFetching } = useAdminExams(query);

    // toDelete: الامتحان اللي دسنا على حذفه، ولو فاضي يبقى المودال مقفول
    const [toDelete, setToDelete] = useState<Exam | null>(null);
    const remove = useDeleteExam();

    function confirmDelete() {
        if (!toDelete) return;
        remove.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
    }

    // updateParams: بتكتب التغييرات في الـ URL، والخانة الفاضية بتتشال
    function updateParams(changes: Record<string, string>) {
        const next = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(changes)) {
            if (value) next.set(key, value);
            else next.delete(key);
        }
        setSearchParams(next);
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Exams" }]}>
                {data ? (
                    <AdminPagination
                        page={data.metadata.page}
                        limit={data.metadata.limit}
                        total={data.metadata.total}
                        totalPages={data.metadata.totalPages}
                        onPageChange={(newPage) => updateParams({ page: String(newPage) })}
                    />
                ) : (
                    <div />
                )}

                <Link
                    to="/admin/exams/new"
                    className="flex h-10 items-center gap-2 bg-emerald-500 px-4 text-sm text-white transition-colors hover:bg-emerald-600"
                >
                    <Plus size={18} />
                    Create New Exam
                </Link>
            </AdminPageHeader>

            <div className="flex flex-col gap-6 p-6 font-mono">
                {/* key: لو الـ URL اتغير من برّه، الكارت يتولد من جديد بالقيم الجديدة */}
                <SearchFilters
                    key={search + immutable + diplomaId}
                    initial={{ search, immutable, diplomaId }}
                    diplomaOptions={diplomaOptions ?? []}
                    onApply={(values) =>
                        updateParams({
                            search: values.search.trim(),
                            immutable: values.immutable,
                            diplomaId: values.diplomaId ?? "",
                            page: "",
                        })
                    }
                    onClear={() => updateParams({ search: "", immutable: "", diplomaId: "", page: "" })}
                />

                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {isLoading && <TableSkeleton />}

                {data &&
                    (data.data.length === 0 ? (
                        <p className="bg-background p-6 text-center text-muted-foreground">No exams found.</p>
                    ) : (
                        <div className={isFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
                            <ExamsTable
                                exams={data.data}
                                sort={{ sortBy, sortOrder }}
                                onSortChange={(value) => updateParams({ sortBy: value.sortBy, sortOrder: value.sortOrder, page: "" })}
                                onDelete={setToDelete}
                                isSuperAdmin={isSuperAdminRole(user?.role)}
                            />
                        </div>
                    ))}
            </div>

            <ConfirmDeleteDialog
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) setToDelete(null);
                }}
                title="Are you sure you want to delete this exam?"
                onConfirm={confirmDelete}
                isPending={remove.isPending}
                error={remove.error}
            />
        </>
    );
}
