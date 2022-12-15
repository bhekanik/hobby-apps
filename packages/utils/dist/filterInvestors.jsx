export const filterInvestors = (deals, investors) => {
    const investorsInDeals = deals.reduce((acc, deal) => {
        const investors = deal.investors;
        return [...acc, ...investors];
    }, []);
    return investors.filter((investor) => {
        if (investorsInDeals.includes(investor.name)) {
            return true;
        }
        return false;
    });
};
//# sourceMappingURL=filterInvestors.jsx.map