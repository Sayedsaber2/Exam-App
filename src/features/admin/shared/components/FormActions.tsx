import { Link } from "react-router-dom";
import { Loader2, Save, X } from "lucide-react";

type Props = {
    formId: string;
    cancelTo: string;
    isPending: boolean;
};

// زرارين Cancel و Save اللي في الشريط الأبيض فوق (فيجما)
export default function FormActions({ formId, cancelTo, isPending }: Props) {
    return (
        <div className="flex gap-2.5 font-mono">
            <Link to={cancelTo} className="flex h-10 items-center gap-2 bg-gray-200 px-4 text-sm text-gray-800 transition-colors hover:bg-gray-300">
                <X size={18} />
                Cancel
            </Link> 

            {/* form: الزرار برّه الفورم، فبنقوله يبعت أنهي فورم برقم الـ id بتاعها */}
            <button
                type="submit"
                form={formId}
                disabled={isPending}
                className="flex h-10 cursor-pointer items-center gap-2 bg-emerald-500 px-4 text-sm text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
            >
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save
            </button>
        </div>
    );
}
