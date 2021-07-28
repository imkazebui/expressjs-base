import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    description: 'unique',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'include at least 1 number',
    required: true,
  })
  @IsNotEmpty()
  @IsDefined()
  pwd: string;
}
