import { getReturns } from '../services/monthReturn.service';
import type { Request, Response } from 'express';

export const getMonthReturns = async (req: Request, res: Response) => {
  try {
    // If all go well and the CSV contains valid data send all the info required to the calculator
    const allReturns = await getReturns();
    res.status(200).json(allReturns);
  } catch (error) {
    //Otherwise send the error and the status 400
    res.status(400).json(error);
  }
};
