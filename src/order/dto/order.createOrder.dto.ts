import { ApiProperty } from '@nestjs/swagger';
import { OrderState } from '../interfaces/order.interface';

export class CreateOrderDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  orderNumber: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  articles: [];
  @ApiProperty()
  restaurant: Array<any>;
  @ApiProperty()
  driver: Array<any>;
  @ApiProperty()
  delivery: Array<any>;
  @ApiProperty()
  state: OrderState;
  @ApiProperty()
  date: Date;
}
