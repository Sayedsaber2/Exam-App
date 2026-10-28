export interface Diploma {
    id: string;
    title: string;
    description: string;
    image: string;
    immutable: boolean; // true = مقفول: السوبر أدمن بس اللي يعدّل أو يحذف
    createdAt: string;
}
