import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Answer } from './answer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  exports: [MikroOrmModule],
})
export class AnswerModule {}
