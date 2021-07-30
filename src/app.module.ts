import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_DIALECT: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_REJECT_UNAUTHORIZED: Joi.boolean().default(false),
        DATABASE_SSL_REQUIRE: Joi.boolean().default(true),
        DATABASE_AUTO_LOAD_MODELS: Joi.boolean().default(true),
        DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}

