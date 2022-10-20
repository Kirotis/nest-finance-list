import { Module } from '@nestjs/common';
import {
  MongooseModule,
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv/config';

export const mongooseForRootConfug: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri: string = configService.get('MONGO_DB');

    const config: MongooseModuleFactoryOptions = {
      uri,
    };
    return config;
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    MongooseModule.forRootAsync(mongooseForRootConfug),
    ConfigModule.forRoot({ isGlobal: true }),
    LogModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
