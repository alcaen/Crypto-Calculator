import { Router } from 'express';
import { getAllPrices, getSinglePrice } from '../controllers/price.controller';

const router = Router();

router.get('/price', (req, res) => {
  void getAllPrices(req, res);
});

router.get('/price/:crypto', (req, res) => {
  void getSinglePrice(req, res);
});

export default router;
