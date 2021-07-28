import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.model';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
  }
}
