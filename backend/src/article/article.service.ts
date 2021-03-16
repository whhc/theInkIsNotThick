import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/schemas/article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto): Promise<Article> {
    const createArticle = new this.articleModel(createArticleDto);
    return createArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async deleteArticle(id) {
    return this.articleModel.findByIdAndDelete(id);
    // return (await this.articleModel.findById(id)).delete();
  }

  async findById(id) {
    return this.articleModel.findById(id);
  }

  async updateArticle(id, data) {
    return this.articleModel.findByIdAndUpdate(id, data);
  }
}
