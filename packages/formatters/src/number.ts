export const numberFormatter = (
  number: number,
  options?: Intl.NumberFormatOptions
): string => {
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    ...(options || {}),
  });

  return formatter.format(number);
};
