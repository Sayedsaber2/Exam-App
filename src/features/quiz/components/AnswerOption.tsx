import { cn } from "@/shared/lib/tailwind-merge";

type Props = {
    text: string;
    checked: boolean;
    onSelect: () => void;
};

// صف إجابة واحد: دايرة راديو + النص — الصف كله زرار
export default function AnswerOption({ text, checked, onSelect }: Props) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={onSelect}
            className="flex h-12 w-full cursor-pointer items-center gap-2.5 bg-muted px-4 text-left text-sm text-gray-800 transition-colors outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary/50"
        >
            {/* الدايرة: بوردر رمادي، ولما تتعلّم بوردر أزرق ونقطة زرقا جواها */}
            <span
                className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                    checked ? "border-primary" : "border-gray-400",
                )}
            >
                {checked && <span className="size-2 rounded-full bg-primary" />}
            </span>
            {text}
        </button>
    );
}

