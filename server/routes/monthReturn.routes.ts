import { Router } from 'express';
import { getMonthReturns } from '../controllers/monthReturn.controller';

const router = Router();
// GET => route /monthReturn for selected coins with the monthReturn
router.get('/monthReturn', (req, res) => {
  void getMonthReturns(req, res);
});

export default router;
