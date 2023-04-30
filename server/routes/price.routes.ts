import { Router } from 'express';
import { getAllPrices, getSinglePrice } from '../controllers/price.controller';

const router = Router();

// GET => route /price for all coins
router.get('/price', (req, res) => {
  void getAllPrices(req, res);
});
// GET => route /price/:crypto for an specific coin
router.get('/price/:crypto', (req, res) => {
  void getSinglePrice(req, res);
});

export default router;
