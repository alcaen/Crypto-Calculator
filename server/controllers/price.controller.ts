import type { Request, Response } from 'express';
import { getAllAssets, getOneAsset } from '../services/price.service';

export const getAllPrices = async (req: Request, res: Response) => {
  try {
    // If the fetch go well send 200 status ok and the all asset info
    const allAssets = await getAllAssets();
    res.status(200).json(allAssets);
  } catch (error) {
    // If the fetch go bad send 400 status and the error (Errors come from service or fetch)
    res.status(400).json(error);
  }
};

export const getSinglePrice = async (
  req: Request<{ crypto: string }>,
  res: Response
) => {
  try {
    // Got the crypto from the params
    const { crypto } = req.params;
    // If the fetch go well send 200 status ok and the all asset info
    const asset = await getOneAsset({ crypto });
    res.status(200).json({ asset });
  } catch (error) {
    // If something happen fetching send that the asset was not found.
    res.status(400).json({ message: 'Asset not found' });
  }
};
