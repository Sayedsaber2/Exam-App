import { Lock } from "lucide-react";
import type { Diploma } from "@/features/diplomas/types";
import type { SortValue } from "@/features/admin/shared/types";
import { DIPLOMA_SORT_OPTIONS } from "@/features/admin/shared/sort-options";
import RowActions from "@/features/admin/shared/components/RowActions";
import SortMenu from "@/features/admin/shared/components/SortMenu";

type Props = {
    diplomas: Diploma[];
    sort: SortValue;
    onSortChange: (value: SortValue) => void;
    onDelete: (diploma: Diploma) => void;
    isSuperAdmin: boolean;
};

// جدول الدبلومات: هيدر أزرق 36px · كل صف 100px (فيجما)
export default function DiplomasTable({ diplomas, sort, onSortChange, onDelete, isSuperAdmin }: Props) {
    return (
        <table className="w-full bg-background text-left text-sm">
            <thead className="bg-primary text-white">
                <tr className="h-9">
                    <th className="w-29 px-4 font-medium">Image</th>
                    <th className="w-50 px-4 font-medium">Title</th>
                    <th className="px-4 font-medium">Description</th>
                    <th className="w-24 px-4 text-right">
                        <SortMenu options={DIPLOMA_SORT_OPTIONS} value={sort} onChange={onSortChange} />
                    </th>
                </tr>
            </thead>

            <tbody>
                {diplomas.map((diploma) => {
                    // مقفول وإنت مش سوبر أدمن → السيرفر هيرفض التعديل والحذف، فنقفل الزراير من الأول
                    const locked = diploma.immutable && !isSuperAdmin;

                    return (
                        <tr key={diploma.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                            <td className="px-4 py-2.5">
                                <img src={diploma.image} alt={diploma.title} className="h-20 w-17.5 object-cover" />
                            </td>

                            <td className="px-4">
                                {/* truncate = سطر واحد وآخره "..." · title = لو وقفت عليه يظهر الاسم كامل */}
                                <div className="flex max-w-42 items-center gap-1.5" title={diploma.title}>
                                    <span className="truncate text-gray-800">{diploma.title}</span>
                                    {diploma.immutable && <Lock size={14} className="shrink-0 text-gray-400" />}
                                </div>
                            </td>

                            <td className="px-4">
                                {/* line-clamp-4 = 4 سطور بالكتير وآخرهم "..." */}
                                <p className="line-clamp-4 text-gray-500">{diploma.description}</p>
                            </td>

                            <td className="px-4 text-right">
                                <RowActions
                                    viewTo={`/admin/diplomas/${diploma.id}`}
                                    editTo={`/admin/diplomas/${diploma.id}/edit`}
                                    onDelete={() => onDelete(diploma)}
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
