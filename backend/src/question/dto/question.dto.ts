import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answers: string[];

  @ApiPropertyOptional()
  image?: string;

  @ApiPropertyOptional()
  userAnswer?: number;

  @ApiPropertyOptional()
  isUserAnswerCorrect?: boolean;
}
