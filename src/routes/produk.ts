import express from 'express';

import { createProduk } from '../controller/produk';

const route = express.Router();

route.post('/create', createProduk);

export default route;
