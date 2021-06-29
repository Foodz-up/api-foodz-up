import { EOrderState } from '../../interfaces';

export class CreateOrderDTO {
  id: number;
  orderNumber: number;
  price: number;
  articles: [];
  restaurant: Array<any>;
  driver: Array<any>;
  delivery: Array<any>;
  state: EOrderState;
  date: Date;
}
