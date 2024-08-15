import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LocationModule } from './modules/location/location.module';
import { LocationEntity } from './modules/location/localtion.entity';
import { LoggerModule } from './modules/logger/logger.module';
import { AllExceptionFilter } from './modules/exception-filter/exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [LocationEntity],
          synchronize: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    LocationModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionFilter }],
})
export class AppModule {}
