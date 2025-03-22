import { ApiProperty } from '@nestjs/swagger';

export class QuizDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  preview: string;
}
