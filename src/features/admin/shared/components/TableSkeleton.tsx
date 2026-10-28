// شكل الجدول وهو بيحمّل: الهيدر الأزرق + صفوف رمادي بتنبض
export default function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="bg-background">
            <div className="h-9 bg-primary" />
            {Array.from({ length: rows }, (_, i) => (
                <div key={i} className="flex h-25 items-center gap-4 border-b border-gray-200 px-4">
                    <div className="h-20 w-17.5 animate-pulse bg-gray-100" />
                    <div className="h-4 w-40 animate-pulse bg-gray-100" />
                    <div className="h-4 flex-1 animate-pulse bg-gray-100" />
                </div>
            ))}
        </div>
    );
}
