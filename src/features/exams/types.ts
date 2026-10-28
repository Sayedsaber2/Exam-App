export interface Exam {
    id: string;
    title: string;
    description: string;
    image: string;
    // duration: بالدقايق
    duration: number;
    questionsCount: number;
    diplomaId: string;
    // diploma: ملخص الدبلومة الأم، بييجي مع الامتحان
    diploma?: { id: string; title: string };
    // immutable: لو مقفول، السوبر أدمن بس اللي يعدّل أو يحذف
    immutable: boolean;
}
