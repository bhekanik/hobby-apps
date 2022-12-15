export const getInvestorsLength = (deals) => {
    return [...new Set(deals.map((deal) => deal.investors).flat())]
        .length;
};
//# sourceMappingURL=getInvestorsLength.js.map