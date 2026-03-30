export type PaginationMeta = {
    current_page: number;
    per_page: number;
    total: number;
};

export type PaginationState = {
    current: number;
    pageSize: number;
    total: number;
};
