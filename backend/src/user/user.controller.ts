import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async get(@Param() params) {
    return this.userService.findOne(params.id);
  }
}
