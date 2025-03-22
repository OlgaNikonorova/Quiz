import { ApiProperty } from '@nestjs/swagger';

export class QuizResultDto {
  @ApiProperty()
  public readonly score: number;

  @ApiProperty()
  public readonly total: number;

  @ApiProperty()
  public readonly percentage: number;

  @ApiProperty()
  public readonly notAnswered: number;
}
