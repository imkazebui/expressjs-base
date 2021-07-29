import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: 'nxyhontbwhlufb',
      password:
        'd9bdc0215c1ad59bf1d0ded1b2d36ac7949ac875e788d01898ac7c7ff97bb9c5',
      database: 'd9914vejijtuof',
      autoLoadModels: true,
      synchronize: true,
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      host: 'ec2-54-83-82-187.compute-1.amazonaws.com',
      port: 5432,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
