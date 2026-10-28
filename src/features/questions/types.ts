export interface Answer    { id: string; text: string; isCorrect: boolean; }
export interface Question  {
    id: string;
    text: string;
    examId: string;
    answers: Answer[];
    // immutable: لو مقفول، السوبر أدمن بس اللي يعدّل أو يحذف
    immutable?: boolean;
    // exam: اسم الامتحان، بييجي لما نجيب سؤال واحد بس
    exam?: { id: string; title: string };
}
