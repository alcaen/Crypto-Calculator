import type { TReturn } from '../types/returned.type';
import { getSelectedCoins } from './price.service';

import fs from 'fs';
import { parse } from 'csv-parse';

export const getReturns = async () => {
  const assets = await getSelectedCoins();

  const filtered: TReturn[] = assets.map((asset) => {
    return {
      name: asset.name,
      price: asset.metrics.market_data.price_usd,
      monthRet: 5 / 100,
    };
  });

  const csvData: string[] = [];
  fs.createReadStream('./docs/monthReturn.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', function (csvrow: string) {
      //do something with csvrow
      csvData.push(csvrow);
    })
    .on('end', function () {
      //do something with csvData
      console.log(csvData);
    });

  return filtered;
};
