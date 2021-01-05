import {
  Column, Entity as TOEntity, Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import Entity from './Entity';

@TOEntity({ name: 'produk' })
export class Produk extends Entity {
  constructor(user: Partial<Produk>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @Column({ type: 'uuid', generatedType: 'VIRTUAL' })
  @PrimaryGeneratedColumn('uuid')
  id_produk!: string;

  @Column({ name: 'nama_produk', length: 255 })
  namaProduk!: string;

  @Column({ type: 'text' })
  keterangan!: string;

  @Column()
  harga!: number;

  @Column()
  jumlah!: number;
}
