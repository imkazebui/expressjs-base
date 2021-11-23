import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), EmailModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
