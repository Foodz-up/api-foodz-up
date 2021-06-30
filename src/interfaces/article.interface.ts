import { Document } from 'mongoose';

export enum ETypeArticle {
  DESERT = 'Désert',
  PLAT = 'Plat',
  ENTREE = 'Entrée',
}

export interface IArticle extends Document {
  id: number;
  type: ETypeArticle;
  name: string;
  description?: string;
  price: number;
  tag?: string;
  picture?: string;
}
