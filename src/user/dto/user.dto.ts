import { ApiProperty } from '@nestjs/swagger';
import Role from '../entities/user.role';

export class UserDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: Role;
  // password: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  refreshTokenExpires: string;
  @ApiProperty()
  cityCode: number;
  @ApiProperty()
  sponsorCode: string;
  @ApiProperty()
  picture: string;
  @ApiProperty()
  address: string;
  // createdAt: Date;
  // updatedAt: Date;
}
