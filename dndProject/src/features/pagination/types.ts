export interface PaginatedResponse<T> {
  meta: {
    total: number;
    current: number;
    limit: number;
  };
  data: T[];
}
export type Pagination =
  | Partial<{
      limit: number;
      page: number;
    }>
  | undefined;
