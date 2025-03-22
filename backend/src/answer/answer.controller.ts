import { AuthGuard } from '@/auth/auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('answer')
@ApiTags('answers')
@UseGuards(AuthGuard)
export class AnswerController {}
