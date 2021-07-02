import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  articles: [];
  @ApiProperty()
  price: number;
}
