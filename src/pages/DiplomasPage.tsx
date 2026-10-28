import { GraduationCap, Loader2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { useDiplomas } from "@/features/diplomas/hooks/useDiplomas";
import DiplomaCard from "@/features/diplomas/components/DiplomaCard";
import DiplomaCardSkeleton from "@/features/diplomas/components/DiplomaCardSkeleton";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

const GRID = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

export default function DiplomasPage() {
    const { data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useDiplomas();

    // العنصر الفاضي اللي لما يبان في الشاشة بنجيب الصفحة اللي بعدها
    const sentinelRef = useInfiniteScroll({
        hasMore: !!hasNextPage,
        isLoading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    // data.pages = [صفحة1, صفحة2, ...] — بنفردهم في قايمة واحدة
    const diplomas = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <div className="space-y-6">
            <PageHeader icon={<GraduationCap />} title="Diplomas" crumbs={[{ label: "Diplomas" }]} />

            {isLoading && (
                <div className={GRID}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <DiplomaCardSkeleton key={n} />
                    ))}
                </div>
            )}

            {isError && <ErrorAlert message={getErrorMessage(error)} />}

            {data && (
                <>
                    {diplomas.length === 0 ? (
                        <p className="text-muted-foreground">No diplomas yet.</p>
                    ) : (
                        <div className={GRID}>
                            {diplomas.map((diploma) => (
                                <DiplomaCard key={diploma.id} diploma={diploma} />
                            ))}
                        </div>
                    )}

                    {/* بنحمّل الصفحة الجاية */}
                    {isFetchingNextPage && (
                        <div className="flex justify-center py-4 text-muted-foreground">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}

                    {/* الحارس: div فاضي — أول ما يدخل الشاشة → صفحة جديدة */}
                    <div ref={sentinelRef} className="h-px" />

                    {/* النص اللي تحت — زي فيجما: لسه في تاني؟ "Scroll to view more" · خلصوا؟ "End of list" */}
                    {diplomas.length > 0 && !isFetchingNextPage && (
                        <p className="py-4 text-center text-sm text-muted-foreground">
                            {hasNextPage ? "Scroll to view more" : "End of list"}
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
