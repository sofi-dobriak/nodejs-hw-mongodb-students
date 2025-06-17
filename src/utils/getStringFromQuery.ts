export const getStringFromQuery = (value: unknown): string | undefined => {
  return typeof value === 'string' ? value : undefined;
};
