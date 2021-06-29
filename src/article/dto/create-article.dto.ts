import { ETypeArticle } from '../../interfaces';

export class CreateArticleDTO {
  name: string;
  description: string;
  type: ETypeArticle;
  price: number;
  restaurantId: number;
}
