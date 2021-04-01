import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { CustomerLoggerModule } from './customer-logger/customer-logger.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/article', {
      connectionName: 'article',
      useFindAndModify: false,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/article', {
      connectionName: 'user',
      useFindAndModify: false,
    }),
    ArticleModule,
    UserModule,
    CustomerLoggerModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
