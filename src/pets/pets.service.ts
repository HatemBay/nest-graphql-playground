import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private ownersService: OwnersService,
  ) {}

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);

    return await this.petsRepository.save(newPet);
  }

  async findAll(): Promise<Pet[]> {
    return await this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRepository.findOneOrFail({ where: { id } });
  }

  async getOwner(ownerId: number): Promise<Owner> {
    return await this.ownersService.findOne(ownerId);
  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
    const oldPet = await this.findOne(id);
    oldPet.name = updatePetInput.name;
    oldPet.type = updatePetInput.type;
    return await this.petsRepository.save(oldPet);
  }

  async remove(id: number): Promise<Pet> {
    const oldPet = await this.findOne(id);
    return await this.petsRepository.remove(oldPet);
  }
}
