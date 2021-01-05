import 'reflect-metadata';

import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import produkRoute from './routes/produk';

config({ path: '.env' });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/produk', produkRoute);

app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);

  try {
    await createConnection();
  } catch (err) {
    console.log(err);
  }
});
