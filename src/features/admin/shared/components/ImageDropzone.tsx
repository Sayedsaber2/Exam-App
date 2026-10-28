import { useState, type ChangeEvent, type DragEvent } from "react";
import { CloudUpload, ImageIcon, Loader2 } from "lucide-react";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useUploadImage } from "@/features/admin/shared/hooks/useUploadImage";

type Props = {
    id: string;
    // رابط الصورة الحالي: فاضي في الإضافة، وفيه الصورة القديمة في التعديل
    value: string;
    onChange: (url: string) => void;
    // بنبلّغ الفورم إن فيه رفع شغال، عشان متتحفظش قبل ما الصورة توصل
    onUploadingChange: (uploading: boolean) => void;
};

// صندوق الصورة: تسحب صورة وترميها جواه، أو تدوس على اللينك وتختار من الجهاز (فيجما)
export default function ImageDropzone({ id, value, onChange, onUploadingChange }: Props) {
    // preview: الصورة اللي بتتعرض في المربع الصغير على الشمال
    const [preview, setPreview] = useState(value);
    // isDragging: بنلوّن البوردر أزرق وإنت ساحب صورة فوق الصندوق
    const [isDragging, setIsDragging] = useState(false);
    const upload = useUploadImage();

    function handleFile(file: File | undefined) {
        if (!file) return;
        // createObjectURL: رابط مؤقت للصورة من جهازك، عشان تظهر فورًا قبل ما الرفع يخلص
        setPreview(URL.createObjectURL(file));
        // الرابط اللي السيرفر هيرجّعه هو اللي بيروح للفورم
        onUploadingChange(true);
        upload.mutate(file, {
            onSuccess: (url) => onChange(url),
            // onSettled: بتشتغل في الحالتين، نجح أو فشل
            onSettled: () => onUploadingChange(false),
        });
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        handleFile(e.target.files?.[0]);
    }

    function handleDrop(e: DragEvent) {
        // preventDefault: من غيرها المتصفح هيفتح الصورة في تاب جديدة
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    }

    return (
        <div>
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex h-22 items-center gap-4 border px-4 ${isDragging ? "border-primary bg-accent" : "border-gray-200"}`}
            >
                {/* المربع الصغير: الصورة لو موجودة، أو أيقونة رمادي */}
                <div className="flex size-14 shrink-0 items-center justify-center bg-gray-50">
                    {preview ? (
                        <img src={preview} alt="Preview" className="size-full object-cover" />
                    ) : (
                        <ImageIcon size={28} className="text-gray-300" />
                    )}
                </div>

                <p className="flex flex-1 items-center justify-center gap-2 text-sm text-gray-500">
                    {upload.isPending ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <CloudUpload size={18} />
                            Drop an image here or
                            {/* label مربوط بالـ input المخفي: الضغط عليه بيفتح اختيار الملفات */}
                            <label htmlFor={id} className="cursor-pointer text-primary hover:underline">
                                select from your computer
                            </label>
                        </>
                    )}
                </p>

                {/* الـ input الحقيقي مخفي، والـ label هو اللي بيفتحه */}
                <input id={id} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
            </div>

            {upload.isError && <p className="mt-2 text-sm text-destructive">{getErrorMessage(upload.error)}</p>}
        </div>
    );
}
