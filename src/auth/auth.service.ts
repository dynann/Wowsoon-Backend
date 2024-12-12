import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async SignIn(username: string, pass: string): Promise<any> {
    const users = await this.userService.getAllUsers();
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
