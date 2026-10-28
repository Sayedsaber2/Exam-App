import * as zod from "zod";

// duration: الخانة بترجّع نص، فبنتأكد إنه رقم صحيح أكبر من صفر، وبنحوّله لرقم وقت الإرسال
export const examSchema = zod.object({
    title: zod.string().trim().nonempty("Title is required"),
    diplomaId: zod.string().nonempty("Diploma is required"),
    duration: zod.string().regex(/^[1-9]\d*$/, "Duration must be a positive number"),
    description: zod.string(),
    image: zod.string(),
});
export type ExamFormValues = zod.infer<typeof examSchema>;
