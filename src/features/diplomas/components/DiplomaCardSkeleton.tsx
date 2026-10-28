// نفس مقاس الكارت وهو بيحمّل — عشان الصفحة متنطش
export default function DiplomaCardSkeleton() {
    return (
        <div className="relative aspect-3/4 animate-pulse bg-muted">
            <div className="absolute inset-x-3 bottom-3 space-y-2 bg-blue-100 p-4">
                <div className="h-5 w-2/3 bg-blue-200" />
                <div className="h-3 w-full bg-blue-200" />
                <div className="h-3 w-4/5 bg-blue-200" />
            </div>
        </div>
    );
}
