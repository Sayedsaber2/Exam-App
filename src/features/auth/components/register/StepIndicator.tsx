import { Fragment } from "react";
import { cn } from "@/shared/lib/tailwind-merge";

export default function StepIndicator({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex items-center px-1">
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
                <Fragment key={n}>
                    {/* المعيّن = مربع صغير مدوّر 45 درجة */}
                    <div
                        className={cn(
                            "size-3 shrink-0 rotate-45 border border-primary transition-colors",
                            n <= current ? "bg-primary" : "bg-background", // عدّت أو واقف عليها = متلوّن
                            n === current && "ring-4 ring-primary/20" // الحالية بس ليها هالة
                        )}
                    />

                    {/* الخط بين كل معيّنين: متصل لو الخطوة خلصت، متقطع لو لسه */}
                    {n < total && (
                        <div
                            className={cn(
                                "flex-1 border-t transition-colors",
                                n < current ? "border-primary" : "border-dashed border-primary/40"
                            )}
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
}
