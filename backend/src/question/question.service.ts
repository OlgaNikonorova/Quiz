import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Question } from './question.entity';
import {
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { Answer } from '@/answer/answer.entity';
import { User } from '@/auth/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly _questionRepository: EntityRepository<Question>,
    @InjectRepository(Answer)
    private readonly _answerRepository: EntityRepository<Answer>,
  ) {}
  async answer(
    questionId: number,
    answerIndex: number,
    userId: number,
  ): Promise<boolean> {
    const entityManager = this._answerRepository.getEntityManager();

    const userRef = await entityManager.getReference(User, userId);
    const question = await this._questionRepository.findOneOrFail(questionId, {
      populate: ['quiz'],
    });

    const firstNotAnsweredQuestion = await this.firstNotAnsweredQuestion(
      question.quiz.id,
      userId,
    );

    if (firstNotAnsweredQuestion.id !== question.id) {
      throw new BadRequestException('Invalid question. Answer the first one');
    }

    const answer = new Answer();
    answer.user = userRef;
    answer.question = question;
    answer.answer = answerIndex;

    try {
      await this._answerRepository.getEntityManager().persistAndFlush(answer);
      return question.correctAnswer === answerIndex;
    } catch (e: unknown) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new ConflictException('Question already answered');
      }
      throw e;
    }
  }

  public async firstNotAnsweredQuestion(quizId: number, userId: number) {
    const answered = await this._answerRepository
      .find(
        {
          user: userId,
          question: { quiz: quizId },
        },
        {
          fields: ['question'],
        },
      )
      .then((answers) => answers.map((answer) => answer.question.id));

    return await this._questionRepository.findOne(
      {
        quiz: quizId,
        id: { $nin: answered },
      },
      {
        orderBy: { id: 'ASC' },
      },
    );
  }

  public async lastQuestion(quizId: number, userId: number): Promise<number> {
    const notAnswered = await this.firstNotAnsweredQuestion(quizId, userId);

    return notAnswered?.id ?? -1;
  }
}
