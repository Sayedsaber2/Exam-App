export interface ApiError {
    status:false
    code: number;
    message: string;    
}
export interface    ApiSuccess<T> {
    status: true;
    code: number;
    message?: string;
    payload: T;
}
export interface ApiMessage {
    status: true;
    code: number;
    message: string;
}
// شكل أي قايمة بترجع من السيرفر: الداتا + معلومات الصفحات
export interface PaginationMetadata {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface Paginated<T> {
    data: T[];
    metadata: PaginationMetadata;
}
