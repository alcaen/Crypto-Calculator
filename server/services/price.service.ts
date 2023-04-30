import axios from 'axios';
import { BASE_URL, BASE_URL_V1 } from '../config';
import {
  AssetSchema,
  type TAssetResponse,
  type TAssetsResponse,
} from '../types/coin.type';

// Services are the functions and logic behind the server in this case this service handles the {prices} route
// Logic to fetch all assets with id,name,slug,symbol and metrics data
export const getAllAssets = async () => {
  const response = await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: '/assets?fields=id,name,slug,symbol,metrics',
  });
  // Basic error handling
  if (response.status === 200) {
    const { data } = response.data as TAssetsResponse;
    return data;
  }
  throw new Error('Response from external API with invalid schema');
};
// Logic to fetch specific asset
export const getOneAsset = async ({ crypto }: { crypto: string }) => {
  const response = await axios({
    method: 'get',
    baseURL: BASE_URL_V1,
    url: `/assets/${crypto}`,
  });
  // More advanced error handling checking if the response is the correct one that the schema requires
  const isValid = AssetSchema.safeParse(response.data).success;

  if (isValid) {
    const { data } = response.data as TAssetResponse;
    return data;
  }
  throw new Error('Response from external API with invalid schema');
};
// Logic to filter the coins to the selected ones in the problem (Bitcoin, Cardano, Ethereum)
export const getSelectedCoins = async () => {
  const assets = await getAllAssets();
  // Select only the required coins
  const selectedAssets = assets.filter(
    (asset) =>
      asset.name === 'Bitcoin' ||
      asset.name === 'Ethereum' ||
      asset.name === 'Cardano'
  );
  return selectedAssets;
};
