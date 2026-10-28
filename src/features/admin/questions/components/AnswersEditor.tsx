import { useState, type KeyboardEvent } from "react";
import { Check, CheckCheck, Plus, Trash2, X } from "lucide-react";
import type { AnswerBody } from "../types";

type Props = {
    // value: الإجابات الحالية، والفورم هو اللي شايلها
    value: AnswerBody[];
    // onChange: بنبعت بيها القايمة الجديدة كلها بعد أي تغيير
    onChange: (answers: AnswerBody[]) => void;
    // error: رسالة الغلط اللي جاية من السكيمة، زي "Mark exactly one correct answer"
    error?: string;
};

// جدول الإجابات تحت السؤال (فيجما)
// كل صف فيه زرار حذف، والنص، وزرار يخلي الإجابة دي هي الصح
export default function AnswersEditor({ value, onChange, error }: Props) {
    // adding: صف الإضافة الأخضر اللي تحت ظاهر ولا لأ
    const [adding, setAdding] = useState(value.length === 0);
    // newText: الكلام اللي بيتكتب في خانة الإجابة الجديدة
    const [newText, setNewText] = useState("");

    function addAnswer() {
        const text = newText.trim();
        if (!text) return;
        // isCorrect: الإجابة الجديدة مش صح لحد ما المستخدم يختارها
        onChange([...value, { text, isCorrect: false }]);
        setNewText("");
    }

    function removeAnswer(index: number) {
        onChange(value.filter((_, i) => i !== index));
    }

    function markCorrect(index: number) {
        // map: الإجابة اللي دسنا عليها تبقى صح، وكل الباقيين يبقوا غلط
        onChange(value.map((answer, i) => ({ ...answer, isCorrect: i === index })));
    }

    // Enter: جوه الفورم بيعمل حفظ للسؤال كله، فبنمنعه ونخليه يضيف الإجابة بس
    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            addAnswer();
        }
    }

    return (
        <div>
            {/* الصف الرمادي اللي فوق: كلمة Body، وعلى اليمين زرار الإضافة */}
            <div className="flex h-9 items-center bg-gray-200 text-sm text-gray-800">
                <span className="w-12 shrink-0" />
                <span className="flex-1 px-3">Body</span>
                <button
                    type="button"
                    onClick={() => setAdding(true)}
                    className="flex h-full cursor-pointer items-center gap-2 bg-emerald-500 px-4 text-white transition-colors hover:bg-emerald-600"
                >
                    <Plus size={16} />
                    Add Answer
                </button>
            </div>

            {value.map((answer, index) => (
                <div key={index} className="flex h-12 items-center border-b border-gray-200 text-sm">
                    <button
                        type="button"
                        aria-label="Delete answer"
                        onClick={() => removeAnswer(index)}
                        className="flex h-full w-12 shrink-0 cursor-pointer items-center justify-center bg-red-50 text-destructive hover:bg-red-100"
                    >
                        <Trash2 size={16} />
                    </button>

                    <span className="flex-1 truncate px-3 text-gray-800">{answer.text}</span>

                    <div className="px-2">
                        {answer.isCorrect ? (
                            <span className="flex items-center gap-1.5 px-3 text-xs text-emerald-500">
                                <CheckCheck size={14} />
                                Correct Answer
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => markCorrect(index)}
                                className="flex h-8 cursor-pointer items-center gap-1.5 bg-gray-200 px-3 text-xs text-gray-800 hover:bg-gray-300"
                            >
                                <Check size={14} />
                                Mark Correct
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {/* صف الإضافة الأخضر */}
            {adding && (
                <div className="flex items-center gap-2 bg-emerald-50 p-2">
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => {
                            setAdding(false);
                            setNewText("");
                        }}
                        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-white"
                    >
                        <X size={16} />
                    </button>
                    <input
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter answer body"
                        className="h-10 flex-1 border border-emerald-500 bg-background px-3 text-sm outline-none"
                    />
                    <button
                        type="button"
                        onClick={addAnswer}
                        className="flex h-10 w-25 cursor-pointer items-center justify-center gap-2 bg-emerald-500 text-sm text-white hover:bg-emerald-600"
                    >
                        <Plus size={16} />
                        Add
                    </button>
                </div>
            )}

            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
    );
}
