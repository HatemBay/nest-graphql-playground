import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signup-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      //TODO: secure user
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ user: user.username, sub: user.id }),
      user: user,
    };
  }

  async signup(signupUserInput: SignupUserInput) {
    const password = await bcrypt.hash(signupUserInput.password, 10);
    return await this.usersService.create({ ...signupUserInput, password });
  }
}
