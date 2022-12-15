interface IDateRange {
  start: Date;
  end: Date;
}

export interface IFilter {
  country: string[];
  stage: string[];
  sector: string[];
  dateRange: IDateRange;
}

export interface IDealflow {
  filter: IFilter;
  searchTerm: string;
  deals: number;
  investors: number;
  value: number;
}
