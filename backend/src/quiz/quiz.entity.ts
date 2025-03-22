import { Question } from '@/question/question.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Quiz {
  @PrimaryKey()
  public id: number;

  @Property()
  public title: string;

  @Property()
  public description: string;

  @Property()
  public preview: string;

  @OneToMany(() => Question, (question) => question.quiz)
  public questions = new Collection<Question>(this);
}
