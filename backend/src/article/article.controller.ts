import { Body, Controller, Get, Post } from '@nestjs/common';
import { Article } from 'src/schemas/article.schema';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto) {
    await this.articleService.create(createArticleDto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }
}
