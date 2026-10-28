import type { ComponentProps } from "react";
import { ChevronsUpDown } from "lucide-react";

type Props = ComponentProps<"select"> & {
    // placeholder: أول اختيار فاضي، ولونه رمادي لحد ما المستخدم يختار حاجة
    placeholder: string;
    options: { value: string; label: string }[];
};

// قايمة اختيار عادية من المتصفح، بس بشكل فيجما
// بنستخدمها في الفلاتر وفي فورم الامتحان
export default function NativeSelect({ placeholder, options, value, className = "", ...props }: Props) {
    return (
        <div className={`relative ${className}`}>
            <select
                {...props}
                value={value}
                className={`h-11 w-full cursor-pointer appearance-none border border-input bg-background px-3 pr-9 text-sm outline-none focus:border-ring aria-invalid:border-destructive ${
                    value === "" ? "text-gray-400" : "text-foreground"
                }`}
            >
                <option value="">{placeholder}</option>
                
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="text-foreground">
                        {option.label}
                    </option>
                ))}
            </select>
            {/* appearance-none: شالت السهم بتاع المتصفح، فبنحط سهمنا مكانه */}
            <ChevronsUpDown size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
        </div>
    );
}
