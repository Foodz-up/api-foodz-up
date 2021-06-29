import { Document } from 'mongoose';
import { IArticle, IMenu } from '../interfaces';

export interface ICart extends Document {
  id: number;
  articles: Array<IArticle | IMenu>;
  price: number;
}
