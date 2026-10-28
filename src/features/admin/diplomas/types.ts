// اللي جدول الدبلومات في الأدمن عايزه من السيرفر
export interface DiplomasQuery {
    page: number;
    search?: string;
    immutable?: boolean;
    sortBy?: "title" | "createdAt";
    sortOrder?: "asc" | "desc";
}

// اللي بنبعته وإحنا بنضيف أو بنعدّل دبلومة
export interface DiplomaBody {
    title: string;
    description?: string;
    image?: string;
}
