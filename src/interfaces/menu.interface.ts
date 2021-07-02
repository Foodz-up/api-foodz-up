import { Document } from 'mongoose';
import { IArticle } from '../interfaces';

export interface IMenu extends Document {
  id: number;
  name: string;
  description?: string;
  articles: Array<IArticle>;
  price: number;
  tag?: string;
  picture?: string;
}
