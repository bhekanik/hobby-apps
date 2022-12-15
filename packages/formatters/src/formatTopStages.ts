import { Deal, FormatTopOptions } from "types";

export const formatTopStages = (
  deals: Deal[],
  options: FormatTopOptions = {}
) => {
  const topStagesMap = deals?.reduce<Record<string, number>>((acc, deal) => {
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
