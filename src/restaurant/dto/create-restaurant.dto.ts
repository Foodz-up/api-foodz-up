import { ETypeRestaurant, ETypeRole, IMenu, IArticle } from '../../interfaces';

export class CreateRestaurantDTO {
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
