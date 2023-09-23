import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const password = await bcrypt.hash(createUserInput.password, 10);

    const user = this.usersRepository.create({ ...createUserInput, password });
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOneOrFail({ where: { username } });
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return await this.usersRepository.remove(user);
  }
}
