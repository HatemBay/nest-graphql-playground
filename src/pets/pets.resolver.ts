import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Owner } from '../owners/entities/owner.entity';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private readonly petsService: PetsService) {}

  @Mutation(() => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return await this.petsService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'getPets' })
  async findAll(): Promise<Pet[]> {
    return await this.petsService.findAll();
  }

  @Query(() => Pet, { name: 'getPet' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return await this.petsService.findOne(id);
  }

  // resolution to the owner field within the pet entity using ownerId field
  @ResolveField(() => Owner)
  async owner(@Parent() pet: Pet): Promise<Owner> {
    return await this.petsService.getOwner(pet.ownerId);
  }

  @Mutation(() => Pet)
  async updatePet(
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
  ): Promise<Pet> {
    return await this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  async removePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return await this.petsService.remove(id);
  }
}
