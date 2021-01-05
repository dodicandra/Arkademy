import express from 'express';

import {
  createProduk, deletProduk, getDataProduk,
  updateProduk,
} from '../controller/produk';

const route = express.Router();

route.get('/', getDataProduk);
route.post('/create', createProduk);
route.put('/update', updateProduk);
route.delete('/delet', deletProduk);

export default route;
