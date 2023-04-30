import { getReturns } from '../services/monthReturn.service';
import type { Request, Response } from 'express';

export const getMonthReturns = async (req: Request, res: Response) => {
  try {
    const allReturns = await getReturns();
    res.status(200).json(allReturns);
  } catch (error) {
    res.status(400).json(error);
  }
};
