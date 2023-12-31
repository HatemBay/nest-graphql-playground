import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
    @Context() context: any,
  ): Promise<User> {
    const user = context.req.user;

    if (user.userId !== id) {
      return await this.usersService.remove(id);
    }
    throw new ForbiddenException("You can't delete your own account.");
  }
}
