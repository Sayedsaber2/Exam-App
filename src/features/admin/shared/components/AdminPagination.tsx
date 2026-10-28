import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

// "1 - 20 of 548  [<] Page 1 of 28 [>]"
export default function AdminPagination({ page, limit, total, totalPages, onPageChange }: Props) {
    // أول وآخر رقم في الصفحة دي: صفحة 2 و limit 20 → من 21 لـ 40
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total); // آخر صفحة ممكن تبقى ناقصة
    const isFirst = page <= 1;
    const isLast = page >= totalPages;

    return (
        <div className="flex items-center gap-4">
            <p className="text-sm text-gray-800">
                {from} - {to} of {total}
            </p>

            <div className="flex">
                <button
                    type="button"
                    aria-label="Previous page"
                    disabled={isFirst}
                    onClick={() => onPageChange(page - 1)}
                    className="flex size-10 cursor-pointer items-center justify-center bg-gray-200 text-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >
                    <ChevronLeft size={18} />
                </button>

                <span className="flex h-10 w-33 items-center justify-center border-y border-gray-200 text-sm text-gray-400">
                    {/* Math.max = لو مفيش نتايج (0 صفحات) نكتب "of 1" مش "of 0" */}
                    Page {page} of {Math.max(totalPages, 1)}
                </span>

                <button
                    type="button"
                    aria-label="Next page"
                    disabled={isLast}
                    onClick={() => onPageChange(page + 1)}
                    className="flex size-10 cursor-pointer items-center justify-center bg-gray-200 text-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
