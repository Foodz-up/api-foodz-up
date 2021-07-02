import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordUserDTO {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  confirmPassword: string;
}
