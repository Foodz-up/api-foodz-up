import { ETypeArticle } from '../../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type: ETypeArticle;
  @ApiProperty()
  price: number;
  @ApiProperty()
  restaurantId: number;
}
