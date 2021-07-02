import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  articles: [];
  @ApiProperty()
  price: number;
  @ApiProperty()
  picture: string;
}
