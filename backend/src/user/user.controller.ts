import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @UseFilters(new HttpExceptionFilter())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @UseFilters(new HttpExceptionFilter())
  async get(@Param() params) {
    return this.userService.findOne(params.id);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Body() user) {
    const _user = await this.userService.login(user);
    console.log(_user);
    if (_user) {
      return _user;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: '密码或者用户名错误',
          data: null,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @UseFilters(new HttpExceptionFilter())
  async delUser(@Param() params) {
    return this.userService.delOne(params.id);
  }
}
