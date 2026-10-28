import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useAuditLog } from "@/features/admin/audit-logs/hooks/useAuditLog";
import {
    ACTION_COLORS,
    ACTION_LABELS,
    ROLE_COLORS,
    ROLE_LABELS,
    capitalize,
    formatDate,
    formatTime,
    getEntityPath,
} from "@/features/admin/audit-logs/audit-log-labels";

// LABEL: الكلمة الرمادية اللي فوق كل معلومة
const LABEL = "text-gray-400";

// صفحة تفاصيل سطر واحد من السجل (فيجما)
export default function ViewAuditLogPage() {
    const { logId = "" } = useParams();
    const { data: log, isError, error } = useAuditLog(logId);

    // title: زي "Diploma Update By ahmed"
    const title = log ? `${capitalize(log.entityType)} ${ACTION_LABELS[log.action]} By ${log.actorUsername}` : "...";
    const entityPath = log ? getEntityPath(log) : null;

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Audit Log", to: "/admin/audit-logs" }, { label: title }]}>
                {log ? (
                    <div className="min-w-0">
                        <h1 className="truncate font-inter text-lg font-semibold text-foreground">{title}</h1>
                        {log.entityId && (
                            <p className="font-inter text-sm text-gray-400">
                                Entity:{" "}
                                {entityPath ? (
                                    <Link to={entityPath} className="inline-flex items-center gap-1 underline hover:text-primary">
                                        {capitalize(log.entityType)} [{log.entityId}]
                                        <ExternalLink size={12} />
                                    </Link>
                                ) : (
                                    <span>
                                        {capitalize(log.entityType)} [{log.entityId}]
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                ) : (
                    <div />
                )}
            </AdminPageHeader>

            <div className="p-6">
                {isError && <ErrorAlert message={getErrorMessage(error)} />}

                {log ? (
                    <div className="flex flex-col gap-4 bg-background p-4 text-sm">
                        <div className="flex flex-col gap-1">
                            <p className={LABEL}>Action</p>
                            <p className={`font-medium uppercase ${ACTION_COLORS[log.action]}`}>{ACTION_LABELS[log.action]}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className={LABEL}>Method</p>
                            {/* ??: لو السيرفر مبعتش الميثود، نكتب شرطة */}
                            <p className="text-gray-800">{log.httpMethod ?? "—"}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className={LABEL}>User</p>
                            <p className="text-gray-800">{log.actorUsername}</p>
                            <div className="text-xs text-gray-500">
                                <p>Email: {log.actorEmail}</p>
                                <p>IP Address: {log.ipAddress ?? "—"}</p>
                                <p>
                                    Role: <span className={ROLE_COLORS[log.actorRole]}>{ROLE_LABELS[log.actorRole]}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className={LABEL}>Entity</p>
                            {entityPath ? (
                                <Link to={entityPath} className="inline-flex w-fit items-center gap-1.5 text-gray-800 hover:text-primary">
                                    {capitalize(log.entityType)}: {log.entityId}
                                    <ExternalLink size={14} />
                                </Link>
                            ) : (
                                <p className="text-gray-800">
                                    {capitalize(log.entityType)}
                                    {log.entityId && `: ${log.entityId}`}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className={LABEL}>Date & Time</p>
                            <p className="text-gray-800">
                                {formatTime(log.createdAt)} | {formatDate(log.createdAt)}
                            </p>
                        </div>

                        {/* metadata: ممكن تيجي null، فالجزء ده بيظهر بس لو فيها حاجة */}
                        {log.metadata && (
                            <>
                                <div className="flex flex-col gap-1">
                                    <p className={LABEL}>Updated Fields</p>
                                    {/* Object.keys: أسامي الخانات اللي جوه الـ metadata، زي title و description */}
                                    <p className="text-gray-800">{Object.keys(log.metadata).join(", ")}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className={LABEL}>Metadata</p>
                                    {/* JSON.stringify: بيحوّل الـ object لنص، والرقم 2 يعني مسافتين قبل كل سطر */}
                                    {/* pre: بيحافظ على السطور والمسافات زي ما هي */}
                                    <pre className="overflow-x-auto bg-gray-100 p-3 text-xs text-gray-800">
                                        {JSON.stringify(log.metadata, null, 2)}
                                    </pre>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    !isError && <div className="h-96 animate-pulse bg-background" />
                )}
            </div>
        </>
    );
}
