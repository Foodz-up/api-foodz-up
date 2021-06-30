import { ETypeArticle } from '../../interfaces';

export class CreateArticleDTO {
  id: number;
  name: string;
  description: string;
  type: ETypeArticle;
  price: number;
  restaurantId: number;
}
