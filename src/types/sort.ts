export type SortOrder = 'asc' | 'desc';

export type SortBy =
  | '_id'
  | 'name'
  | 'age'
  | 'gender'
  | 'avgMark'
  | 'onDuty'
  | 'createdAt'
  | 'updatedAt';

export interface SortParams {
  sortOrder: SortOrder;
  sortBy: SortBy;
}
