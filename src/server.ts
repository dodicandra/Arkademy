import 'reflect-metadata';

import cors from 'cors';
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
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use('/api/produk', produkRoute);

app.use((req, res, next) => {
  const error = new Error('Page not found') as any;
  error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);

  try {
    await createConnection();
  } catch (err) {
    console.log(err);
  }
});
