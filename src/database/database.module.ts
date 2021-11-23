import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DATABASE_DIALECT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        autoLoadModels: configService.get('DATABASE_AUTO_LOAD_MODELS'),
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
        sync: {
          force: false,
        },
        dialectOptions: {
          ssl: {
            require: configService.get('DATABASE_SSL_REQUIRE'),
            rejectUnauthorized: configService.get(
              'DATABASE_REJECT_UNAUTHORIZED',
            ),
          },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
