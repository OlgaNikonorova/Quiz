import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Question } from './question.entity';
import { AnswerModule } from '@/answer/answer.module';
import { QuestionService } from './question.service';

@Module({
  imports: [MikroOrmModule.forFeature([Question]), AnswerModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [MikroOrmModule, QuestionService],
})
export class QuestionModule {}
