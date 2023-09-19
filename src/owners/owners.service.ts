import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from '../pets/entities/pet.entity';
import { PetsService } from '../pets/pets.service';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService)) private petsService: PetsService,
  ) {}

  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return await this.ownersRepository.save(newOwner);
  }

  async findOne(id: number): Promise<Owner> {
    return await this.ownersRepository.findOneOrFail({ where: { id } });
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownersRepository.find();
  }

  async findPets(): Promise<Pet[]> {
    return await this.petsService.findAll();
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
    const oldOwner = await this.findOne(id);
    oldOwner.name = updateOwnerInput.name;

    return await this.ownersRepository.save(oldOwner);
  }

  async remove(id: number): Promise<Owner> {
    const oldOwner = await this.findOne(id);
    return await this.ownersRepository.remove(oldOwner);
  }
}
