import type { Request, Response } from 'express';
import { getAllAssets, getOneAsset } from '../services/price.service';

export const getAllPrices = async (req: Request, res: Response) => {
  try {
    const allAssets = await getAllAssets();
    res.status(200).json(allAssets);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getSinglePrice = async (
  req: Request<{ crypto: string }>,
  res: Response
) => {
  try {
    const { crypto } = req.params;
    const asset = await getOneAsset({ crypto });
    res.status(200).json({ asset });
  } catch (error) {
    res.status(400).json({ message: 'Asset not found' });
  }
};
