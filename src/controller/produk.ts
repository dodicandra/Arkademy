import { Request, Response } from 'express';

export async function createProduk(req: Request, res: Response) {
  try {
    return res.json({ name: 'OK' });
  } catch (err) {
    return res.status(500).json({ messasge: err });
  }
}
