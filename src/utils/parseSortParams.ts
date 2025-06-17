import { SORT_ORDER } from '../constants/constants';
import { ParsedQs } from 'qs';
import { getStringFromQuery } from './getStringFromQuery';
import { SortBy, SortOrder } from '../types/sort';

const parseSortOrder = (sortOrder?: string): string => {
  if (sortOrder === SORT_ORDER.ASC || sortOrder === SORT_ORDER.DESC) {
    return sortOrder as SortOrder;
  }

  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy?: string): SortBy => {
  const keysOfStudent: SortBy[] = [
    '_id',
    'name',
    'age',
    'gender',
    'avgMark',
    'onDuty',
    'createdAt',
    'updatedAt',
  ];

  return keysOfStudent.includes(sortBy as SortBy) ? (sortBy as SortBy) : '_id';
};

export const parseSortParams = (query: ParsedQs) => {
  const sortOrder = getStringFromQuery(query.sortOrder);
  const sortBy = getStringFromQuery(query.sortBy);

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
