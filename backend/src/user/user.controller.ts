import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/user.dto';
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
}
