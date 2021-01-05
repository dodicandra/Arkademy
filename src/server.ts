import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));

app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);

  try {
    await createConnection();
  } catch (err) {
    console.log(err);
  }
});
