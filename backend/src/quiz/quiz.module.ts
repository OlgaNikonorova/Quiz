import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { QuestionModule } from '@/question/question.module';
import { AnswerModule } from '@/answer/answer.module';

@Module({
  imports: [MikroOrmModule.forFeature([Quiz]), QuestionModule, AnswerModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
