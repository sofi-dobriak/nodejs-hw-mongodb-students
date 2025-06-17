export const calculatePaginationData = (
  count: number,
  perPage: number,
  page: number,
) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const previousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    previousPage,
  };
};
