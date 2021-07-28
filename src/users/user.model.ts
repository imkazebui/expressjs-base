import { Column, Model, Table, Unique } from 'sequelize-typescript';
import { Exclude } from 'class-transformer';

@Table
export class User extends Model {
  @Unique
  @Column
  username: string;

  @Exclude()
  @Column
  pwd: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
