import {
  EOrderState,
  IArticle,
  IMenu,
  IRestaurant,
  IUser,
} from '../../interfaces';

export class CreateOrderDTO {
  id: number;
  price: number;
  items: Array<IArticle | IMenu>;
  status: EOrderState;
  driver: IUser | null;
  restaurant: IRestaurant;
  client: IUser;
  // TODO: change to date
  date: number;
  distance: number;
}
