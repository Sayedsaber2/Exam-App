import * as zod from "zod";

// title: الحاجة الوحيدة الإجبارية، زي ما السيرفر طالب
export const diplomaSchema = zod.object({
    title: zod.string().trim().nonempty("Title is required"),
    description: zod.string(),
    image: zod.string(),
});
export type DiplomaFormValues = zod.infer<typeof diplomaSchema>;
