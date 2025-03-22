import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { hashPassword, verifyPassword } from '@/utils';

@Entity()
export class User {
  @PrimaryKey()
  public id: number;

  @Unique()
  @Property()
  public username: string;

  @Property()
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.updatePassword(password);
  }

  public updatePassword(password: string) {
    this.password = hashPassword(password);
  }

  public validatePassword(toValidate: string) {
    return verifyPassword(toValidate, this.password);
  }
}
