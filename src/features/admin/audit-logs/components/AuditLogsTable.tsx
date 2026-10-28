import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { SortValue } from "@/features/admin/shared/types";
import { AUDIT_LOG_SORT_OPTIONS } from "@/features/admin/shared/sort-options";
import RowActions from "@/features/admin/shared/components/RowActions";
import SortMenu from "@/features/admin/shared/components/SortMenu";
import { ACTION_COLORS, ACTION_LABELS, ROLE_COLORS, ROLE_LABELS, capitalize, formatDate, formatTime, getEntityPath } from "../audit-log-labels";
import type { AuditLog } from "../types";

type Props = {
    logs: AuditLog[];
    sort: SortValue;
    onSortChange: (value: SortValue) => void;
    // onDelete: بتتبعت للسوبر أدمن بس، فالأدمن العادي مش بيشوف زرار Delete
    onDelete?: (log: AuditLog) => void;
};

// جدول سجل التغييرات: الأكشن، ومين عمله، واتعمل في إيه، وإمتى (فيجما)
export default function AuditLogsTable({ logs, sort, onSortChange, onDelete }: Props) {
    return (
        <table className="w-full bg-background text-left text-sm">
            <thead className="bg-primary text-white">
                <tr className="h-9">
                    <th className="w-36 px-4 font-medium">Action</th>
                    <th className="w-64 px-4 font-medium">User</th>
                    <th className="px-4 font-medium">Entity</th>
                    <th className="w-48 px-4 font-medium">Time</th>
                    <th className="w-20 px-4 text-right">
                        <SortMenu options={AUDIT_LOG_SORT_OPTIONS} value={sort} onChange={onSortChange} />
                    </th>
                </tr>
            </thead>

            <tbody>
                {logs.map((log) => {
                    const entityPath = getEntityPath(log);

                    return (
                        <tr key={log.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                            <td className="px-4 py-5">
                                <p className={`font-medium uppercase ${ACTION_COLORS[log.action]}`}>{ACTION_LABELS[log.action]}</p>
                                {log.httpMethod && <p className="text-xs text-gray-400">Method: {log.httpMethod}</p>}
                            </td>

                            <td className="px-4 py-5">
                                <p className="font-medium text-gray-800">{log.actorUsername}</p>
                                <p className="max-w-56 truncate text-xs text-gray-400">{log.actorEmail}</p>
                                <p className={`text-xs ${ROLE_COLORS[log.actorRole]}`}>{ROLE_LABELS[log.actorRole]}</p>
                            </td>

                            <td className="px-4 py-5">
                                <p className="text-gray-800">{capitalize(log.entityType)}</p>
                                {/* لو الحاجة ليها صفحة، الـ id يبقى لينك ليها */}
                                {log.entityId &&
                                    (entityPath ? (
                                        <Link to={entityPath} className="inline-flex items-center gap-1 text-xs whitespace-nowrap text-gray-400 hover:text-primary">
                                            {log.entityId}
                                            <ExternalLink size={12} />
                                        </Link>
                                    ) : (
                                        <p className="text-xs text-gray-400">{log.entityId}</p>
                                    ))}
                            </td>

                            <td className="px-4 py-5 text-gray-800">
                                <p>{formatTime(log.createdAt)}</p>
                                <p>{formatDate(log.createdAt)}</p>
                            </td>

                            <td className="px-4 text-right">
                                {/* undefined: الأدمن العادي، فـ RowActions بيخفي زرار Delete لوحده */}
                                {/* editTo: مش بنبعته، لأن السجل مينفعش يتعدل */}
                                <RowActions
                                    viewTo={`/admin/audit-logs/${log.id}`}
                                    onDelete={onDelete ? () => onDelete(log) : undefined}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
