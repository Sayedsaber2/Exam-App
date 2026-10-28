import * as zod from "zod";

const answerSchema = zod.object({
    text: zod.string().trim().nonempty("Answer is required"),
    isCorrect: zod.boolean(),
});

// قواعد السيرفر: إجابتين على الأقل، وواحدة بس منهم صح
const answersSchema = zod
    .array(answerSchema)
    .min(2, "Add at least 2 answers")
    .refine((answers) => answers.filter((answer) => answer.isCorrect).length === 1, "Mark exactly one correct answer");

// سؤال واحد: النص والإجابات
const questionFieldsSchema = zod.object({
    text: zod.string().trim().nonempty("Question headline is required"),
    answers: answersSchema,
});

// فورم سؤال واحد: الامتحان وبعدين السؤال
export const questionSchema = questionFieldsSchema.extend({
    examId: zod.string().nonempty("Exam is required"),
});
export type QuestionFormValues = zod.infer<typeof questionSchema>;

// فورم الأسئلة الكتير: امتحان واحد، وتحته قايمة أسئلة
export const bulkQuestionsSchema = zod.object({
    examId: zod.string().nonempty("Exam is required"),
    questions: zod.array(questionFieldsSchema).min(1, "Add at least one question"),
});
export type BulkQuestionsFormValues = zod.infer<typeof bulkQuestionsSchema>;
