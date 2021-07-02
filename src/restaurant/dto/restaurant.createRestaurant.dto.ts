import { ApiProperty } from '@nestjs/swagger';
import { ETypeRestaurant, ETypeRole, IMenu, IArticle } from '../../interfaces';

export class CreateRestaurantDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: ETypeRestaurant;
  @ApiProperty()
  menus?: Array<IMenu>;
  @ApiProperty()
  articles?: Array<IArticle>;
  @ApiProperty()
  timetable?: {
    lundi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    mardi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    mercredi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    jeudi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    vendredi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    samedi: { mStart: string; mEnd: string; aStart: string; aEnd: string };
    dimanche: { mStart: string; mEnd: string; aStart: string; aEnd: string };
  };
  @ApiProperty()
  picture?: string;
  @ApiProperty()
  address?: string;
  @ApiProperty()
  editor?: number;
  @ApiProperty()
  waiting?: number;
  @ApiProperty()
  note?: number;
}
