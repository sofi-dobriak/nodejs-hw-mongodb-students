import { ParsedQs } from 'qs';
import { getStringFromQuery } from './getStringFromQuery';
import { PaginationParams } from '../types/pagination';

export const parseNumber = (
  number: string | undefined,
  defaultValue: number,
): number => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) return defaultValue;

  return parsedNumber;
};

export const parsePaginationParams = (query: ParsedQs): PaginationParams => {
  const perPage = getStringFromQuery(query.perPage);
  const page = getStringFromQuery(query.page);

  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);

  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
