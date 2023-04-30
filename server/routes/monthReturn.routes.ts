import { Router } from 'express';
import { getMonthReturns } from '../controllers/monthReturn.controller';

const router = Router();

router.get('/monthReturn', (req, res) => {
  void getMonthReturns(req, res);
});

export default router;
