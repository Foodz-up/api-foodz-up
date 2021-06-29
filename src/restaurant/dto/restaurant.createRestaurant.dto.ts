import { ApiProperty } from '@nestjs/swagger';
import { RestaurantType } from '../interfaces/restaurant.interface';

export class CreateRestaurantDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: RestaurantType;
  @ApiProperty()
  articles: Array<any>;
  @ApiProperty()
  menus: Array<any>;
  @ApiProperty()
  avaibilities: Array<any>;
  @ApiProperty()
  picture: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  editors: Array<any>;
}
