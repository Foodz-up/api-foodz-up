import {
  EOrderState,
  IArticle,
  IMenu,
  IRestaurant,
  IUser,
} from '../../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  items: Array<IArticle | IMenu>;
  @ApiProperty()
  status: EOrderState;

  @ApiProperty()
  driver: IUser | null;

  @ApiProperty()
  restaurant: IRestaurant;

  @ApiProperty()
  client: IUser;
  // TODO: change to date

  @ApiProperty()
  date: number;

  @ApiProperty()
  distance: number;
}
