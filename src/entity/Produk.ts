import { Column, Entity as TOEntity } from 'typeorm';

import Entity from './Entity';

@TOEntity({ name: 'users' })
export class Produk extends Entity {
  constructor(user: Partial<Produk>) {
    super();
    Object.assign(this, user);
  }

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;
}
