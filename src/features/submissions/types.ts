export interface SubmissionAnswer {
    questionId: string;
    answerId: string;
}

export interface SubmitExamBody {
    examId: string;
    answers: SubmissionAnswer[];
    startedAt: string;
}

export interface Submission {
    id: string;
    examId: string;
    score: number | null;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    startedAt: string;
    submittedAt: string;
}

export interface AnswerSummary {
    id: string;
    text: string;
}

export interface QuestionAnalytic {
    questionId: string;
    questionText: string;
    selectedAnswer: AnswerSummary | null;
    correctAnswer: AnswerSummary | null;
    isCorrect: boolean;
}

export interface SubmitExamResult {
    submission: Submission;
    analytics: QuestionAnalytic[];
}
