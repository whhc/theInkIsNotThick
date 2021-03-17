import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  // ApiHeader,
  ApiOperation,
  ApiParam,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateArticleDto } from 'src/dto/article.dto';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { Article } from 'src/schemas/article.schema';
import { ArticleService } from './article.service';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: '新建文章' })
  // @ApiHeader({ name: 'X-MyHeader', description: 'Customer header' })
  // @ApiResponse({ status: 200, description: '成功' })
  // @ApiResponse({ status: 401, description: '没有权限' })
  @ApiCreatedResponse({ description: '创建成功', type: Article })
  @ApiBody({ type: CreateArticleDto })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @UseFilters(new HttpExceptionFilter())
  async findById(@Param() params) {
    return this.articleService.findById(params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @UseFilters(new HttpExceptionFilter())
  async delete(@Param() params) {
    return this.articleService.deleteArticle(params.id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ required: true, type: Object })
  @UseFilters(new HttpExceptionFilter())
  async update(@Param() params, @Body() data) {
    return this.articleService.updateArticle(params.id, data);
  }
}
