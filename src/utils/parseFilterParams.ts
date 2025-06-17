import { ParsedQs } from 'qs';
import { getStringFromQuery } from './getStringFromQuery';
import { Filter } from '../types/pagination';

const parseGender = (gender?: string): string | undefined => {
  const isString = typeof gender === 'string';
  if (!isString) return;

  const isGender = (gender: string) =>
    ['male', 'female', 'other'].includes(gender);

  if (isGender(gender)) return gender;
};

const parseNumber = (number?: string): number | undefined => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parseNumber = parseInt(number);
  if (Number.isNaN(number)) return;

  return parseNumber;
};

export const parseFilterParams = (query: ParsedQs): Filter => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;

  return {
    gender: parseGender(getStringFromQuery(gender)),
    maxAge: parseNumber(getStringFromQuery(maxAge)),
    minAge: parseNumber(getStringFromQuery(minAge)),
    maxAvgMark: parseNumber(getStringFromQuery(maxAvgMark)),
    minAvgMark: parseNumber(getStringFromQuery(minAvgMark)),
  };
};
