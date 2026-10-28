import { useEffect, useRef } from "react";

type Options = {
    hasMore: boolean;      // في صفحات تانية؟
    isLoading: boolean;    // بنحمّل دلوقتي؟ (عشان منطلبش مرتين)
    onLoadMore: () => void;
};

// بيرجّع ref تحطه على عنصر فاضي آخر القايمة — أول ما يبان في الشاشة بينده onLoadMore
export function     useInfiniteScroll({ hasMore, isLoading, onLoadMore }: Options) {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el || !hasMore) return;

        // IntersectionObserver = المتصفح يقولك لما عنصر يدخل/يخرج من الشاشة (من غير ما تسمع للسكرول بنفسك)
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isLoading) onLoadMore();
        }, { rootMargin: "200px" }); // ابدأ التحميل قبل ما يوصل للآخر بـ 200px — يحس إنها فورية

        observer.observe(el);
        return () => observer.disconnect(); // تنظيف
    }, [hasMore, isLoading, onLoadMore]);

    return sentinelRef;
}
