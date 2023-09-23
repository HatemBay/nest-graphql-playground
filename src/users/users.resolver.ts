import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'getUsers' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('username') username: string): Promise<User> {
    return await this.usersService.findOne(username);
  }

  @Mutation(() => User)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: any,
  ): Promise<User> {
    if (user.userId !== id) {
      return await this.usersService.remove(id);
    }
    throw new ForbiddenException("You can't delete your own account.");
  }
}
