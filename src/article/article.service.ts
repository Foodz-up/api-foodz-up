import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IArticle, IRestaurant } from '../interfaces';
import { CreateArticleDTO } from './dto/article.create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article')
    private readonly articleModel: Model<IArticle>,
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<IRestaurant>,
  ) {}
  // fetch all article
  async getAllArticle(): Promise<IArticle[]> {
    const article = await this.articleModel.find();
    return article;
  }
  // Get a single customer
  async getArticle(customerID): Promise<IArticle> {
    const customer = await this.articleModel.findOne({ id: customerID });
    return customer;
  }

  async addArticle(createArticleDTO: CreateArticleDTO): Promise<IArticle> {
    const newArticle = await new this.articleModel(createArticleDTO);
    return newArticle.save();
  }
  // post a single customer

  // Edit customer details
  async updateArticle(
    customerID,
    createArticleDTO: CreateArticleDTO,
  ): Promise<IArticle> {
    const updatedArticle = await this.articleModel.findOneAndUpdate(
      customerID,
      createArticleDTO,
      { new: true },
    );
    return updatedArticle;
  }
  // Delete a customer
  async deleteArticle(customerID): Promise<any> {
    const deletedArticle = await this.articleModel.findOneAndRemove(customerID);
    return deletedArticle;
  }

  async addArticleMe(
    createArticleDTO: CreateArticleDTO,
    userId: number,
  ): Promise<IArticle> {
    const newArticle = await new this.articleModel(createArticleDTO);
    await this.restaurantModel.findOneAndUpdate(
      { editor: userId },
      { $push: { articles: newArticle } },
      { new: true, useFindAndModify: true },
    );
    return newArticle;
  }

  async deleteArticleMe(userId: number, articleId: number): Promise<any> {
    const deletedArticle = await this.restaurantModel.findOneAndUpdate(
      { editor: userId },
      { $pull: { articles: { id: articleId } } },
      { multi: true, new: true, useFindAndModify: true },
    );
    return deletedArticle;
  }

  async updateArticleMe(
    userId: number,
    createArticleDTO: CreateArticleDTO,
  ): Promise<any> {
    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate(
      { editor: userId, articles: { $elemMatch: { id: createArticleDTO.id } } },
      { $set: { 'articles.$': createArticleDTO } },
      { new: true, useFindAndModify: true },
    );

    const updatedArticle = updatedRestaurant.articles.find(
      (article) => article.id === createArticleDTO.id,
    );
    return updatedArticle;
  }
}
