export const getStageCounts = (deals) => {
    return deals.reduce((acc, deal) => {
        acc[deal.stage] = (acc[deal.stage] ?? 0) + 1;
        return acc;
    }, {});
};
export const getFormattedStageCounts = (deals) => {
    const stagesCounts = getStageCounts(deals);
    return Object.entries(stagesCounts)
        .sort((a, b) => (a[1] < b[1] ? 1 : -1))
        .reduce((acc, [stage, number]) => {
        if (number === 0) {
            return acc;
        }
        if (acc === "") {
            return `${stage}: ${number}`;
        }
        return acc + `, ${stage}: ${number}`;
    }, "");
};
//# sourceMappingURL=getStagesCounts.js.map