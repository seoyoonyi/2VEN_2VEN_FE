export interface TradingTypeProps {
  tradingTypeId?: number;
  tradingTypeOrder?: number;
  tradingTypeName: string;
  tradingTypeIcon: string;
  isActive?: string;
}

export interface InvestmentAssetProps {
  order: number;
  investmentAssetClassesName: string;
  investmentAssetClassesIcon: string;
  isActive: string;
}
