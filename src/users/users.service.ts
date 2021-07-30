import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ErrorCode from 'src/database/error-code.enum';
import { generatePassword } from 'src/utils/pwd';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(payload: CreateUserDto): Promise<User> {
    const d = new Date();
    const currentTime = d.toISOString();

    const user = new User(payload);
    user.pwd = generatePassword(payload.pwd, currentTime);
    user.updatedAt = currentTime;
    user.createdAt = currentTime;

    try {
      await user.save({
        silent: true,
        validate: true,
      });
      return user;
    } catch (error) {
      if (error?.original?.code === ErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
