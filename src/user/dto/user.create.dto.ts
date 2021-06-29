import { ApiProperty } from '@nestjs/swagger';
import Role from '../entities/user.role';

export class CreateUserDTO {
  // id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: Role;
  @ApiProperty()
  password: string;
  @ApiProperty()
  cityCode: number;
  // refreshToken: string;
  // sponsorCode: string;
  // profilePicture: string;
  // createdAt: Date;
  // updatedAt: Date;
}
