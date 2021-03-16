import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    required: true,
    example: `Article's title`,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
    example: `2020-03-16`,
  })
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    required: true,
    example: `Now you can write what you wanna to say here.`,
  })
  @IsNotEmpty()
  content: string;
}
