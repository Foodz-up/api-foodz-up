import { ApiProperty } from '@nestjs/swagger';
import Role from '../entities/user.role';

export class UpdateUserDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  // role: Role;
  @ApiProperty()
  password: string;
  // refreshToken: string;
  @ApiProperty()
  cityCode: number;
  @ApiProperty()
  sponsorCode: string;
  @ApiProperty()
  profilePicture: string;
  // createdAt: Date;
  // updatedAt: Date;
}
