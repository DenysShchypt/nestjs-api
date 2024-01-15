import { ApiProperty } from '@nestjs/swagger';

export class CreateContact {
  @ApiProperty()
  username: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
}
export class UpdateContact {
  @ApiProperty()
  username: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isActive: boolean;
}
export class UpdateIsActive {
  @ApiProperty()
  isActive: boolean;
}
