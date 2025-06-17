export interface PaginationQuery {
  page: string;
  perPage: string;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface Filter {
  gender?: string | undefined;
  maxAge?: number | undefined;
  minAge?: number | undefined;
  maxAvgMark?: number | undefined;
  minAvgMark?: number | undefined;
}

export interface QueryParams {
  page: number;
  perPage: number;
  sortOrder: string;
  sortBy: string;
  filter: Filter;
}
