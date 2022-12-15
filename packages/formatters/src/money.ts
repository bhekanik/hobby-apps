export const moneyFormatter = (
  amount: number,
  options?: Intl.NumberFormatOptions
): string => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    ...(options || {}),
  });

  return formatter.format(amount);
};
