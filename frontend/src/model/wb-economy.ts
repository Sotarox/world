export interface WbEconomyInfo {
  year: string;
  gdpValue: number;
  growthRate: number;
}

export interface WbEconomyWrapper {
  page: number;
  pages: number;
  perPage: number;
  total: number;
  sourceId: string;
  lastUpdated: string;
  data: WbEconomyInfo[];
}
