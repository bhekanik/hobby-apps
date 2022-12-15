import { moneyFormatter } from "formatters";
export const getDealRange = (deal) => {
    const dealAmounts = deal.map(({ amount }) => amount).filter(Boolean);
    const min = Math.min(...dealAmounts);
    const max = Math.max(...dealAmounts);
    return { min, max };
};
export const getFormattedDealRange = (deal) => {
    const { min, max } = getDealRange(deal);
    if (min === Infinity) {
        return `Undisclosed`;
    }
    if (min === max) {
        return `${moneyFormatter(min)}`;
    }
    return `${moneyFormatter(min)} - ${moneyFormatter(max)}`;
};
//# sourceMappingURL=getDealRange.js.map