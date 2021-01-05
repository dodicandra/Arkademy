import { Column, Entity as TOEntity, PrimaryGeneratedColumn } from 'typeorm';

import Entity from './Entity';

@TOEntity({ name: 'users' })
export class User extends Entity {
  constructor(user: Partial<User>) {
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
