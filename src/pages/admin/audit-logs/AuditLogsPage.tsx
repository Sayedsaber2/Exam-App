import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { isSuperAdminRole } from "@/shared/lib/roles";
import { useProfile } from "@/features/account/hooks/useProfile";
import AdminPagination from "@/features/admin/shared/components/AdminPagination";
import ConfirmDeleteDialog from "@/features/admin/shared/components/ConfirmDeleteDialog";
import TableSkeleton from "@/features/admin/shared/components/TableSkeleton";
import AuditLogFilters from "@/features/admin/audit-logs/components/AuditLogFilters";
import AuditLogsTable from "@/features/admin/audit-logs/components/AuditLogsTable";
import { useAdminUserOptions } from "@/features/admin/audit-logs/hooks/useAdminUserOptions";
import { useAuditLogs } from "@/features/admin/audit-logs/hooks/useAuditLogs";
import { useClearAuditLogs } from "@/features/admin/audit-logs/hooks/useClearAuditLogs";
import { useDeleteAuditLog } from "@/features/admin/audit-logs/hooks/useDeleteAuditLog";
import type { AuditAction, AuditCategory, AuditLog, AuditLogsQuery } from "@/features/admin/audit-logs/types";

// نفس فكرة صفحة الامتحانات: الـ URL شايل الصفحة والفلاتر والترتيب
export default function AuditLogsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: user } = useProfile();
    const { data: userOptions } = useAdminUserOptions();

    // isSuperAdmin: المسح للسوبر أدمن بس (Swagger)
    const isSuperAdmin = isSuperAdminRole(user?.role);

    // ---------- اقرا من الـ URL ----------
    const page = Number(searchParams.get("page") ?? "1");
    const category = (searchParams.get("category") ?? "") as AuditCategory | "";
    const action = (searchParams.get("action") ?? "") as AuditAction | "";
    const actorUserId = searchParams.get("actorUserId") ?? "";
    const sortBy = (searchParams.get("sortBy") ?? "createdAt") as NonNullable<AuditLogsQuery["sortBy"]>;
    const sortOrder = (searchParams.get("sortOrder") ?? "desc") as NonNullable<AuditLogsQuery["sortOrder"]>;

    // ---------- حوّلهم للشكل اللي السيرفر عايزه ----------
    // undefined: الفلتر الفاضي مش بيتبعت للسيرفر خالص
    const query: AuditLogsQuery = {
        page,
        category: category || undefined,
        action: action || undefined,
        actorUserId: actorUserId || undefined,
        sortBy,
        sortOrder,
    };

    const { data, isLoading, isError, error, isFetching } = useAuditLogs(query);

    // toDelete: السطر اللي دسنا على حذفه، ولو null يبقى المودال مقفول
    const [toDelete, setToDelete] = useState<AuditLog | null>(null);
    const remove = useDeleteAuditLog();

    // clearOpen: مودال مسح السجل كله مفتوح ولا لأ
    const [clearOpen, setClearOpen] = useState(false);
    const clear = useClearAuditLogs();

    function confirmDelete() {
        if (!toDelete) return;
        remove.mutate(toDelete.id, { onSuccess: () => setToDelete(null) });
    }

    function confirmClear() {
        // undefined: الطلب ده مش محتاج أي بيانات
        clear.mutate(undefined, {
            onSuccess: () => {
                setClearOpen(false);
                // page: السجل بقى فاضي، فارجع لأول صفحة
                updateParams({ page: "" });
            },
        });
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
            <AdminPageHeader crumbs={[{ label: "Audit Log" }]}>
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

                {/* زرار المسح الأحمر بيظهر للسوبر أدمن بس */}
                {isSuperAdmin && (
                    <button
                        type="button"
                        disabled={data?.metadata.total === 0}
                        onClick={() => setClearOpen(true)}
                        className="flex h-10 cursor-pointer items-center gap-2 bg-destructive px-4 text-sm text-white transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2 size={18} />
                        Clear All Logs
                    </button>
                )}
            </AdminPageHeader>

            <div className="flex flex-col gap-6 p-6">
                {/* key: لو الـ URL اتغير من برّه، الكارت يتولد من جديد بالقيم الجديدة */}
                <AuditLogFilters
                    key={category + action + actorUserId}
                    initial={{ category, action, actorUserId }}
                    userOptions={userOptions ?? []}
                    onApply={(values) => updateParams({ ...values, page: "" })}
                    onClear={() => updateParams({ category: "", action: "", actorUserId: "", page: "" })}
                />

                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {isLoading && <TableSkeleton />}

                {data &&
                    (data.data.length === 0 ? (
                        <p className="bg-background p-6 text-center text-muted-foreground">No logs found.</p>
                    ) : (
                        <div className={isFetching ? "opacity-60 transition-opacity" : "transition-opacity"}>
                            <AuditLogsTable
                                logs={data.data}
                                sort={{ sortBy, sortOrder }}
                                onSortChange={(value) => updateParams({ sortBy: value.sortBy, sortOrder: value.sortOrder, page: "" })}
                                onDelete={isSuperAdmin ? setToDelete : undefined}
                            />
                        </div>
                    ))}
            </div>

            <ConfirmDeleteDialog
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) setToDelete(null);
                }}
                title="Are you sure you want to delete this log?"
                onConfirm={confirmDelete}
                isPending={remove.isPending}
                error={remove.error}
            />

            {/* confirmLabel: نفس المودال، بس الزرار مكتوب عليه Yes, clear (فيجما) */}
            <ConfirmDeleteDialog
                open={clearOpen}
                onOpenChange={setClearOpen}
                title="Are you sure you want to clear all logs?"
                confirmLabel="Yes, clear"
                onConfirm={confirmClear}
                isPending={clear.isPending}
                error={clear.error}
            />
        </>
    );
}
