import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async findAll() {
    const users = this.userModel.find().exec();
    console.log(users);
    return users;
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async delOne(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async login(user: LoginUserDto) {
    return this.userModel.findOne(
      { name: user.name, password: user.password },
      'name email gender',
    );
  }
}
