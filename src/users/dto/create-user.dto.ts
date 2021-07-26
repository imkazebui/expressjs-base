import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    description: 'unique',
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'include at least 1 number',
    required: true,
  })
  pwd: string;
}
