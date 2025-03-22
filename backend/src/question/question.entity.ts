import { Quiz } from '@/quiz/quiz.entity';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Question {
  @PrimaryKey()
  public id: number;

  @Property()
  public question: string;

  @Property({ nullable: true })
  public image?: string;

  @Property({ type: 'json' })
  public answers: string[];

  @Property()
  public correctAnswer: number;

  @ManyToOne(() => Quiz)
  public quiz: Quiz;
}
