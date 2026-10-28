const SIZE = 208; // size-52
const STROKE = 36;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Props = {
    correct: number;
    total: number;
};

// دونات: أحمر كامل تحت (الغلط) + قوس أخضر فوقه بنسبة الصح — نفس حيلة dasharray بتاعة التايمر
export default function ResultDonut({ correct, total }: Props) {
    const fraction = total > 0 ? correct / total : 0;

    return (
        <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="size-52 -rotate-90"
            role="img"
            aria-label={`${correct} of ${total} correct`}
        >
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-red-500" />
            <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={STROKE}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - fraction)}
                className="stroke-emerald-500"
            />
        </svg>
    );
}
