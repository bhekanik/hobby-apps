export const formatTopStages = (deals, options = {}) => {
    const topStagesMap = deals?.reduce((acc, deal) => {
        const { stage } = deal;
        acc[stage] = acc[stage] ? acc[stage] + 1 : 1;
        return acc;
    }, {});
    const topStages = Object.entries(topStagesMap || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, options.top || 5)
        .map((entry) => `${entry[0]} - ${entry[1]}`);
    return topStages;
};
//# sourceMappingURL=formatTopStages.js.map