import { Document } from 'mongoose';
import { IArticle } from './article.interface';
import { IMenu } from './menu.interface';

export enum ETypeRestaurant {
  FASTFOOD = 'Fastfood',
  KEBAB = 'Kebab',
}

export enum ETypeRole {
  RESTAURATOR = 'Restaurateur',
  DRIVER = 'Livreur',
  CLIENT = 'Client',
  COMMERCIAL = 'Commercial',
  TECHNIQUE = 'Technique',
}

export interface IRestaurant extends Document {
  _id: object;
  name: string;
  type: ETypeRestaurant;
  menus?: Array<IMenu>;
  articles?: Array<IArticle>;
  timetable?: {
    lundi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    mardi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    mercredi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    jeudi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    vendredi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    samedi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    dimanche: { mStart: string; mEnd: string; aStart: string; aEnd: string };
  };
  picture?: string;
  address?: string;
  editor?: number;
  waiting?: number;
  note?: number;
}
