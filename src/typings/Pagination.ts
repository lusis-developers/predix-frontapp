export type Pagination = {
  total: number;
  totalPages: number;
  limit: number;
  currentPage: number;
};

export type PaginatedResponse<T> = {
  bets: T[];
  pagination: Pagination;
  total: number;
};