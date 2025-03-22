import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuizModule } from './quiz/quiz.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AnswerModule } from './answer/answer.module';
import config from './mikro-orm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MikroOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
    }),
    QuizModule,
    QuestionModule,
    AuthModule,
    AnswerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
