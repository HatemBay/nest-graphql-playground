import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from '../pets/entities/pet.entity';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  async createOwner(
    @Args('createOwnerInput') createOwnerInput: CreateOwnerInput,
  ): Promise<Owner> {
    return await this.ownersService.create(createOwnerInput);
  }

  @Query(() => Owner, { name: 'getOwner' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return await this.ownersService.findOne(id);
  }

  @ResolveField(() => Pet)
  async pets(): Promise<Pet[]> {
    return await this.ownersService.findPets();
  }

  @Query(() => [Owner], { name: 'getOwners' })
  async findAll(): Promise<Owner[]> {
    return await this.ownersService.findAll();
  }

  @Mutation(() => Owner)
  async updateOwner(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput,
  ): Promise<Owner> {
    return await this.ownersService.update(id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  async removeOwner(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Owner> {
    return await this.ownersService.remove(id);
  }
}
