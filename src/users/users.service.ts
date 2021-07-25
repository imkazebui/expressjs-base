import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generatePassword } from 'src/utils/pwd';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(body: CreateUserDto): Promise<User> {
    const d = new Date();
    const currentTime = d.toISOString();

    const user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;
    user.pwd = generatePassword(body.pwd, currentTime);
    user.updatedAt = currentTime;
    user.createdAt = currentTime;

    return user.save({
      silent: true,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(params: any): Promise<User> {
    return this.userModel.findOne({
      where: params,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
