import { AuthGuard } from '@/auth/auth.guard';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AnswerDto } from './dto/answer.dto';
import { QuestionService } from './question.service';
import { CurrentUser } from '@/auth/current-user.decorator';
import { Token } from '@/auth/token';

@Controller('questions')
@ApiTags('questions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class QuestionController {
  constructor(private readonly _questionService: QuestionService) {}

  @Post(':id/answer')
  @ApiOkResponse({ type: Boolean })
  @ApiConflictResponse({ description: 'Question already answered' })
  @ApiNotFoundResponse({ description: 'Question not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  answer(
    @Param('id') id: number,
    @Body() dto: AnswerDto,
    @CurrentUser() token: Token,
  ): Promise<boolean> {
    return this._questionService.answer(id, dto.answerIndex, token.sub);
  }
}
