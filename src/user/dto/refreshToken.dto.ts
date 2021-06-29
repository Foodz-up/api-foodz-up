import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  refreshTokenExpires: string;
}
