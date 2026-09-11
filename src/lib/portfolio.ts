import portfolioDataRaw from '@/data/portfolioData.json';
import { PortfolioData } from '@/types/portfolio';

export const portfolioData = portfolioDataRaw as PortfolioData;

export function getPortfolioData(): PortfolioData {
  return portfolioData;
}
