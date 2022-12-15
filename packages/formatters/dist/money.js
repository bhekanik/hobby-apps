export const moneyFormatter = (amount, options) => {
    const formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        ...(options || {}),
    });
    return formatter.format(amount);
};
//# sourceMappingURL=money.js.map