import { User } from '@/auth/user.entity';
import { Question } from '@/question/question.entity';
import { Entity, ManyToOne, PrimaryKeyProp, Property } from '@mikro-orm/core';

@Entity()
export class Answer {
  @ManyToOne({ primary: true })
  public question: Question;

  @ManyToOne({ primary: true })
  public user: User;

  @Property()
  public answer: number;

  [PrimaryKeyProp]?: ['question', 'user'];
}
