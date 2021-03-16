import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:dbUserPassword@cluster0.zvrcg.mongodb.net/db01',
      {
        connectionName: 'article',
        useFindAndModify: false,
      },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:dbUserPassword@cluster0.zvrcg.mongodb.net/db01',
      {
        connectionName: 'user',
        useFindAndModify: false,
      },
    ),
    ArticleModule,
    UserModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
