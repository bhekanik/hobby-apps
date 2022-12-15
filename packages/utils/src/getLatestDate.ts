type NonEmptyArray<T> = [T, ...T[]];

export const getLatestDate = (dateArray: NonEmptyArray<Date>) => {
  return [...new Set(dateArray)].reduce((a, b) => {
    return a > b ? a : b;
  });
};
