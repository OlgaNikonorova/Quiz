import { EntityRepository, sql } from '@mikro-orm/sqlite';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { QuizDto } from './dto/quiz.dto';
import { QuestionDto } from '@/question/dto/question.dto';
import { QuizResultDto } from './dto/result.dto';
import { Answer } from '@/answer/answer.entity';
import { Question } from '@/question/question.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly _quizRepository: EntityRepository<Quiz>,
    @InjectRepository(Question)
    private readonly _questionRepository: EntityRepository<Question>,
    @InjectRepository(Answer)
    private readonly _answerRepository: EntityRepository<Answer>,
  ) {}

  public async list(): Promise<QuizDto[]> {
    const quizzes = await this._quizRepository.findAll({
      fields: ['id', 'title', 'description', 'preview'],
    });
    return quizzes.map((quiz) => ({
      description: quiz.description,
      id: quiz.id,
      preview: quiz.preview,
      title: quiz.title,
    }));
  }

  public async questions(id: number, userId?: number): Promise<QuestionDto[]> {
    try {
      const quiz = await this._quizRepository.findOneOrFail(id, {
        fields: ['questions'],
        populate: ['questions'],
      });

      const userAnswers = await this._answerRepository.find({
        question: { $in: quiz.questions.map((q) => q.id) },
        user: userId,
      });

      return quiz.questions.map((question) => {
        const userAnswer = userAnswers.find(
          (answer) => answer.question.id === question.id,
        )?.answer;

        const isUserAnswerCorrect =
          userAnswer !== undefined
          ? userAnswer === question.correctAnswer
          : undefined;

        return {
          answers: question.answers,
          id: question.id,
          image: question.image,
          question: question.question,
          userAnswer,
          isUserAnswerCorrect,
        };
      });
    } catch {
      throw new NotFoundException('Quiz not found');
    }
  }

  public async result(quizId: number, userId: number): Promise<QuizResultDto> {
    const correctAnswers = await this._answerRepository
      .createQueryBuilder('answer')
      .leftJoin('answer.question', 'question')
      .leftJoin('question.quiz', 'quiz')
      .where({ user: userId, question: { quiz: quizId } })
      .where(sql`answer.answer = question.correct_answer`)
      .count();

    const totalQuestions = await this._questionRepository.count({
      quiz: quizId,
    });

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

    const notAnswered = await this._questionRepository.count({
      quiz: quizId,
      id: { $nin: answered },
    });

    return {
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
      score: correctAnswers,
      total: totalQuestions,
      notAnswered,
    };
  }
}
