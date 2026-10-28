import { useParams } from "react-router-dom";
import { BookOpenCheck, Loader2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useDiploma } from "@/features/diplomas/hooks/useDiploma";
import { useExams } from "@/features/exams/hooks/useExams";
import ExamCard from "@/features/exams/components/ExamCard";
import ExamCardSkeleton from "@/features/exams/components/ExamCardSkeleton";

export default function ExamsPage() {
  const { diplomaId = "" } = useParams();

  // طلبين مختلفين: اسم الدبلومة (للعنوان) + امتحاناتها (للكروت)
  const { data: diploma } = useDiploma(diplomaId);
  const { data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useExams(diplomaId);

  const sentinelRef = useInfiniteScroll({
    hasMore: !!hasNextPage,
    isLoading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const exams = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BookOpenCheck />}
        title={`${diploma?.title ?? ""} Exams`}
        crumbs={[{ label: "Diplomas", to: "/" }, { label: diploma?.title ?? "..." }, { label: "Exams" }]}
        backTo="/"
      />

      {isLoading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((n) => (
            <ExamCardSkeleton key={n} />
          ))}
        </div>
      )}

      {isError && <ErrorAlert message={getErrorMessage(error)} />}

      {data && (
        <>
          {exams.length === 0 ? (
            <p className="text-muted-foreground">No exams in this diploma yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}

          {isFetchingNextPage && (
            <div className="flex justify-center py-4 text-muted-foreground">
              <Loader2 className="animate-spin" />
            </div>
          )}

          <div ref={sentinelRef} className="h-px" />

          {exams.length > 0 && !isFetchingNextPage && (
            <p className="py-2 text-center text-sm text-muted-foreground">
              {hasNextPage ? "Scroll to view more" : "End of list"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
