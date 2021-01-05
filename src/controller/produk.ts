import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Produk } from '../entity/Produk';

export async function getDataProduk(req: Request, res: Response) {
  try {
    const produk = await Produk.find();
    return res.json({ produk });
  } catch (err) {
    return res.status(500).json({ message: 'terjadi kesalahan' });
  }
}

export async function createProduk(req: Request, res: Response) {
  const { namaProduk, keterangan, harga, jumlah } = req.body as Produk;
  try {
    let errors: any = {};
    // validasi input
    if (namaProduk.trim() === '') {
      errors.namaProduk = 'tidak boleh kosong';
    }
    if (keterangan.trim() === '') {
      errors.keterangan = 'tidak boleh kosong';
    }
    if (!harga || !jumlah) {
      errors.harga = 'tidak boleh kosong';
      errors.jumlah = 'tidak boleh kosong';
    }

    if (Object.keys(errors).length) {
      return res.status(500).json({ error: errors });
    }
    // insert ke data base
    const produk = new Produk({ namaProduk, keterangan, harga, jumlah });
    await produk.save();

    return res.json({ message: 'Data Berhasil ditambahkan', produk: produk.toJSON() });
  } catch (err) {
    return res.status(500).json({ messasge: err });
  }
}

export async function updateProduk(req: Request, res: Response) {
  const { id_produk, harga, jumlah, keterangan, namaProduk } = req.body as Produk;
  try {
    await Produk.findOneOrFail({ where: { id_produk } });

    const as = await getConnection()
      .createQueryBuilder()
      .update(Produk)
      .set({ harga, jumlah, keterangan, namaProduk })
      .where('id_produk = :id_produk', { id_produk })
      .execute();

    return res.json({ message: 'Produk Berhasil di Update', status: as.affected });
  } catch (err) {
    let error: any = {};
    if (err.name === 'EntityNotFound') {
      error.message = 'Tidak ditemukan produk dengan ID ini';
    }
    if (Object.keys(error).length) {
      err.message = error.message;
      delete err.name;
    }

    return res.status(500).json({ message: err.message });
  }
}
export async function deletProduk(req: Request, res: Response) {
  const { id_produk } = req.body as Produk;
  try {
    await Produk.findOneOrFail({ where: { id_produk } });

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Produk)
      .where('id_produk = :id_produk', { id_produk })
      .execute();

    return res.json({ message: 'Produk Berhasil di Hapus' });
  } catch (err) {
    let error: any = {};
    if (err.name === 'EntityNotFound') {
      error.message = 'Tidak ditemukan produk dengan ID ini';
    }
    if (Object.keys(error).length) {
      err.message = error.message;
      delete err.name;
    }

    return res.status(500).json({ message: err.message });
  }
}
