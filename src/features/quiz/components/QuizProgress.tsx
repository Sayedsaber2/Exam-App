type Props = {
    label: string; // "Frontend Development - CSS Quiz"
    current: number; // رقم السؤال (بيبدأ من 1 للعرض)
    total: number;
};

// السطر اللي فوق + شريط التقدم
export default function QuizProgress({ label, current, total }: Props) {
    const percent = (current / total) * 100;

    return (
        <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between gap-4 text-sm">
                <p className="truncate text-gray-700">{label}</p>
                <p className="shrink-0 text-muted-foreground">
                    Question <span className="font-bold text-primary">{current}</span> of {total}
                </p>
            </div>

            <div className="h-2 bg-blue-100" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
                <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
