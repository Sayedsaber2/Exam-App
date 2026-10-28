// اللي جدول الامتحانات في الأدمن عايزه من السيرفر
export interface ExamsQuery {
    page: number;
    search?: string;
    diplomaId?: string;
    immutable?: boolean;
    sortBy?: "title" | "createdAt" | "questions";
    sortOrder?: "asc" | "desc";
}

// اللي بنبعته وإحنا بنضيف أو بنعدّل امتحان
export interface ExamBody {
    title: string;
    description?: string;
    image?: string;
    duration: number;
    diplomaId: string;
}
