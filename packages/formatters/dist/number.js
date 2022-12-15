export const numberFormatter = (number, options) => {
    const formatter = Intl.NumberFormat("en-US", {
        notation: "compact",
        ...(options || {}),
    });
    return formatter.format(number);
};
//# sourceMappingURL=number.js.map