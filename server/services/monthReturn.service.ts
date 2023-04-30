import type { TReturn } from '../types/returned.type';
import { getSelectedCoins } from './price.service';
import csv from 'csvtojson';

// Services are the functions and logic behind the server in this case this service handles the {monthReturn} route
// Logic to get the returns of the selected assets to use in the calculator
export const getReturns = async () => {
  // Fetch selected coins
  const assets = await getSelectedCoins();
  // Select only the fields required for the calculator
  const filtered: TReturn[] = assets.map((asset) => {
    return {
      id: asset.id,
      name: asset.name,
      price: asset.metrics.market_data.price_usd,
      monthRet: 5 / 100,
    };
  });
  // The path to the CSV with the monthly returns
  const csvFilePath = './docs/monthReturn.csv';
  // Read the csv and build an array of objects with the fields
  const csvData = (await csv().fromFile(csvFilePath)) as {
    name: string;
    month_return: string;
  }[];
  // Combine the selected fields with the monthly return that the server get from the CSV
  const coinsMonthReturn = filtered.map((coin) => {
    return {
      ...coin,
      monthRet: csvData.filter((asset) => asset.name === coin.name)[0]
        ?.month_return,
    };
  });
  // Return the info for the calculator
  return coinsMonthReturn;
};
