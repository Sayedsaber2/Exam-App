// نفس مقاسات ExamCard وهو بيحمّل — عشان الصفحة متنطش لما الداتا توصل
export default function ExamCardSkeleton() {
    return (
        <div className="flex gap-4 bg-blue-50 p-4">
            <div className="size-16 shrink-0 animate-pulse border border-input bg-background" />
            <div className="min-w-0 flex-1 space-y-2">
                <div className="flex justify-between">
                    <div className="h-5 w-1/3 animate-pulse bg-blue-100" />
                    <div className="h-4 w-1/4 animate-pulse bg-blue-100" />
                </div>
                <div className="h-3 w-full animate-pulse bg-blue-100" />
                <div className="h-3 w-4/5 animate-pulse bg-blue-100" />
            </div>
        </div>
    );
}
