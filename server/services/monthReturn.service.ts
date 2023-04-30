import type { TReturn } from '../types/returned.type';
import { getSelectedCoins } from './price.service';
import csv from 'csvtojson';

export const getReturns = async () => {
  const assets = await getSelectedCoins();

  const filtered: TReturn[] = assets.map((asset) => {
    return {
      id: asset.id,
      name: asset.name,
      price: asset.metrics.market_data.price_usd,
      monthRet: 5 / 100,
    };
  });

  const csvFilePath = './docs/monthReturn.csv';
  const csvData = (await csv().fromFile(csvFilePath)) as {
    name: string;
    month_return: string;
  }[];

  const coinsMonthReturn = filtered.map((coin) => {
    return {
      ...coin,
      monthRet: csvData.filter((asset) => asset.name === coin.name)[0]
        ?.month_return,
    };
  });

  return coinsMonthReturn;
};
