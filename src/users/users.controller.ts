import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'clgt' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list user' })
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserDto> {
    const user = await this.usersService.findOne({ id: req.user.userId });
    return new UserDto(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    return new UserDto(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
