import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { DtoUserSignIn } from '../user/dto.user.sign-in';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: DtoUserSignIn) {
    const user = await this.userService.findOneByLogin(signInDto.login);
    if (!(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { login: user.login, sub: user.id };
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
