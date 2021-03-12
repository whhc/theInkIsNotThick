import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbUser:dbUserPassword@cluster0.zvrcg.mongodb.net/db01',
      // 'mongodb+srv://dbUser:dbUserPassword@cluster0.zvrcg.mongodb.net/db01?retryWrites=true&w=majority',
      {
        connectionName: 'article',
      },
    ),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
