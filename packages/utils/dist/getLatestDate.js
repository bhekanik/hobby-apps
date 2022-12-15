export const getLatestDate = (dateArray) => {
    return [...new Set(dateArray)].reduce((a, b) => {
        return a > b ? a : b;
    });
};
//# sourceMappingURL=getLatestDate.js.map