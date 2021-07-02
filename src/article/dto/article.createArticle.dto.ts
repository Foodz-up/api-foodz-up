import { ApiProperty } from '@nestjs/swagger';
import { ArticleType } from '../interfaces/article.interface';

export class CreateArticleDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type: ArticleType;
  @ApiProperty()
  price: number;
}
