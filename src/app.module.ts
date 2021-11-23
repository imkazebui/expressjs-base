import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // DATABASE
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
        // EMAIL
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        // OTHER
        PORT_SERVER: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    FilesModule,
  ],
})
export class AppModule {}
