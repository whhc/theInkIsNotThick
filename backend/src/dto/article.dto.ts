import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    required: true,
    example: `Article's title`,
  })
  title: string;

  @ApiProperty({
    required: true,
    example: `2020-03-16`,
  })
  date: string;

  @ApiProperty({
    required: true,
    example: `Now you can write what you wanna to say here.`,
  })
  content: string;
}
