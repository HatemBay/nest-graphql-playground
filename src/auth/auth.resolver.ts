import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { SignupUserInput } from './dto/signup-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return await this.authService.login(context.user);
  }

  @Mutation(() => User)
  async signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return await this.authService.signup(signupUserInput);
  }
}
