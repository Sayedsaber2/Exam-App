const SIZE = 64; // قطر الدايرة بالبكسل (size-16)
const STROKE = 6; // سُمك الخط
const RADIUS = (SIZE - STROKE) / 2; // نص القطر ناقص نص السُمك عشان الخط ميتقصش من الحرف
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // محيط الدايرة = طول الخط لو اتفرد

type Props = {
    secondsLeft: number;
    totalSeconds: number;
};

// دايرة بتفضى مع الوقت + الوقت المتبقي mm:ss في النص
export default function QuizTimer({ secondsLeft, totalSeconds }: Props) {
    const fraction = totalSeconds > 0 ? secondsLeft / totalSeconds : 0; // 1 = كامل · 0 = خلص

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const label = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
        <div className="relative size-16 shrink-0" role="timer" aria-label={`${label} left`}>
            {/* -rotate-90 عشان الخط يبدأ من فوق (الساعة 12) مش من اليمين */}
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full -rotate-90">
                {/* المسار الرمادي الكامل */}
                <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-gray-200" />
                {/* الجزء الأزرق: dasharray = شرطة بطول المحيط · dashoffset = قد إيه نخبّي منها */}
                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    strokeWidth={STROKE}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={CIRCUMFERENCE * (1 - fraction)}
                    className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-linear"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
                {label}
            </span>
        </div>
    );
}
