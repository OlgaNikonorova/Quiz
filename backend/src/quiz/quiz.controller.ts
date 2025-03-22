import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QuizDto } from './dto/quiz.dto';
import { QuestionDto } from '@/question/dto/question.dto';
import { AuthGuard } from '@/auth/auth.guard';
import { QuizService } from './quiz.service';
import { QuizResultDto } from './dto/result.dto';
import { CurrentUser } from '@/auth/current-user.decorator';
import { Token } from '@/auth/token';
import { QuestionService } from '@/question/question.service';

@ApiTags('quizzes')
@Controller('quizzes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class QuizController {
  constructor(
    private readonly _quizService: QuizService,
    private readonly _questionService: QuestionService,
  ) {}
  @Get()
  @ApiOkResponse({ type: QuizDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  list(): Promise<QuizDto[]> {
    return this._quizService.list();
  }

  @Get(':id/questions')
  @ApiOkResponse({ type: QuestionDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Quiz not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  questions(
    @Param('id') id: number,
    @CurrentUser() token: Token,
  ): Promise<QuestionDto[]> {
    return this._quizService.questions(id, token?.sub);
  }

  @Get(':id/last-question')
  @ApiOkResponse({
    type: Number,
    description: 'id последнего неотвеченного вопроса',
  })
  @ApiNotFoundResponse({ description: 'Quiz not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async lastQuestion(
    @Param('id') id: number,
    @CurrentUser() token: Token,
  ): Promise<number> {
    return this._questionService.lastQuestion(id, token.sub);
  }

  @Get(':id/result')
  @ApiOkResponse({ type: QuizResultDto })
  @ApiNotFoundResponse({ description: 'Quiz not found' })
  async result(
    @Param('id') quiz: number,
    @CurrentUser() token: Token,
  ): Promise<QuizResultDto> {
    return this._quizService.result(quiz, token.sub);
  }
}
