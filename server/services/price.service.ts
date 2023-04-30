import axios from 'axios';
import { BASE_URL } from '../config';
import {
  AssetSchema,
  AssetsSchema,
  type TAssetResponse,
  type TAssetsResponse,
} from '../types/coin.type';

export const getAllAssets = async () => {
  const response = await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: '/assets?fields=id,name,slug,symbol,metrics',
  });

  if (response.status === 200) {
    const { data } = response.data as TAssetsResponse;
    return data;
  }
  throw new Error('Response from external API with invalid schema');
};

export const getOneAsset = async ({ crypto }: { crypto: string }) => {
  const response = await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: `/assets/${crypto}`,
  });
  const isValid = AssetSchema.safeParse(response.data).success;
  if (isValid) {
    const { data } = response.data as TAssetResponse;
    return data;
  }
  throw new Error('Response from external API with invalid schema');
};

export const getSelectedCoins = async () => {
  const assets = await getAllAssets();
  const selectedAssets = assets.filter(
    (asset) =>
      asset.name === 'Bitcoin' ||
      asset.name === 'Ethereum' ||
      asset.name === 'Cardano'
  );
  return selectedAssets;
};
