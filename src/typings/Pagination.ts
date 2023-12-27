export type Pagination = {
  total: number;
  totalPages: number;
  limit: number;
  currentPage: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: Pagination;
};