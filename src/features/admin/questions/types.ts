// إجابة واحدة وإحنا بنضيف أو بنعدّل سؤال
export interface AnswerBody {
    text: string;
    isCorrect: boolean;
}

// السؤال اللي بنبعته: النص، وإجابتين على الأقل، وواحدة بس منهم صح
export interface QuestionBody {
    text: string;
    answers: AnswerBody[];
}

// ترتيب أسئلة الامتحان
export interface QuestionsSort {
    sortBy: "title" | "createdAt";
    sortOrder: "asc" | "desc";
}
