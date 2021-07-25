import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { validPassword } from '../utils/pwd';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username });

    if (user && validPassword(pass, user.pwd, user.updatedAt.toISOString())) {
      const { pwd, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { username, id } = user.dataValues;
    const payload = { username, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
