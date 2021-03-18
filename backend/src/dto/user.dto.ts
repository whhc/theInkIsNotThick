import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: `name`,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  inviteCode: string;
}

export class LoginUserDto {
  @ApiProperty({
    required: true,
    example: `name`,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNotEmpty()
  password: string;
}
