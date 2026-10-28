import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useProfile } from "@/features/account/hooks/useProfile";
import { useAdminDiplomas } from "@/features/admin/diplomas/hooks/useAdminDiplomas";
import { useDeleteDiploma } from "@/features/admin/diplomas/hooks/useDeleteDiploma";
import type { Diploma } from "@/features/diplomas/types";
import type { DiplomasQuery } from "@/features/admin/diplomas/types";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";
import AdminPagination from "@/features/admin/shared/components/AdminPagination";
import DiplomasTable from "@/features/admin/diplomas/components/DiplomasTable";
import SearchFilters from "@/features/admin/shared/components/SearchFilters";
import TableSkeleton from "@/features/admin/shared/components/TableSkeleton";
import type { FiltersValue } from "@/features/admin/shared/types";

export default function AdminDiplomasPage() {
    // الـ URL هو "المخزن": ?page=2&search=react&sortBy=title&sortOrder=asc
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: user } = useProfile();

    // ---------- 1) اقرا كل حاجة من الـ URL (ولو مش موجودة خد القيمة الافتراضية) ----------
    const page = Number(searchParams.get("page") ?? "1");
    const search = searchParams.get("search") ?? "";
    const immutable = (searchParams.get("immutable") ?? "") as FiltersValue["immutable"];
    const sortBy = (searchParams.get("sortBy") ?? "createdAt") as NonNullable<DiplomasQuery["sortBy"]>;
    const sortOrder = (searchParams.get("sortOrder") ?? "desc") as NonNullable<DiplomasQuery["sortOrder"]>;

    // ---------- 2) حوّلهم للشكل اللي السيرفر عايزه ----------
    const query: DiplomasQuery = {
        page,
        search: search || undefined, // "" → undefined → مش هيتبعت خالص
        immutable: immutable === "" ? undefined : immutable === "true", // "true" → true · "false" → false
        sortBy,
        sortOrder,
    };

    const { data, isLoading, isError, error, isFetching } = useAdminDiplomas(query);

    // toDelete: الدبلومة اللي دسنا على Delete بتاعها، ولو مفيش يبقى المودال مقفول
    const [toDelete, setToDelete] = useState<Diploma | null>(null);
    const remove = useDeleteDiploma();

    function confirmDelete() {
        if (!toDelete) return;
        remove.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
    }

    // ---------- 3) أي تغيير = اكتبه في الـ URL → الصفحة تعيد رندر → query جديدة → طلب جديد ----------
    function updateParams(changes: Record<string, string>) {
        const next = new URLSearchParams(searchParams); // نسخة من الموجود
        for (const [key, value] of Object.entries(changes)) {
            if (value) next.set(key, value); // فيه قيمة → حطها
            else next.delete(key); // فاضية → شيلها من الـ URL
        }
        setSearchParams(next);
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Diplomas" }]}>
                {/* الترقيم بيظهر بعد ما الداتا توصل (محتاجين total و totalPages من السيرفر) */}
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
                    to="/admin/diplomas/new"
                    className="flex h-10 items-center gap-2 bg-emerald-500 px-4 text-sm text-white transition-colors hover:bg-emerald-600"
                >
                    <Plus size={18} />
                    Add New Diploma
                </Link>
            </AdminPageHeader>

            <div className="flex flex-col gap-6 p-6 font-mono">
                {/* key = لو الـ URL اتغير من برّه (زرار Back) الكارت يتولد من جديد بالقيم الجديدة */}
                <SearchFilters
                    key={search + immutable}
                    initial={{ search, immutable }}
                    // بحث جديد → ارجع لصفحة 1 (page: "" = امسحها من الـ URL)
                    onApply={(values) => updateParams({ search: values.search.trim(), immutable: values.immutable, page: "" })}
                    onClear={() => updateParams({ search: "", immutable: "", page: "" })}
                />

                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {isLoading && <TableSkeleton />}

                {data &&
                    (data.data.length === 0 ? (
                        <p className="bg-background p-6 text-center text-muted-foreground">No diplomas found.</p>
                    ) : (
                        // isFetching = بيجيب صفحة جديدة والقديمة لسه ظاهرة → نبهّتها شوية عشان المستخدم يعرف
                        <div className={isFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
                            <DiplomasTable
                                diplomas={data.data}
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
                title="Are you sure you want to delete this diploma?"
                onConfirm={confirmDelete}
                isPending={remove.isPending}
                error={remove.error}
            />
        </>
    );
}
