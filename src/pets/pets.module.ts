import { Module, forwardRef } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { OwnersModule } from '../owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), forwardRef(() => OwnersModule)],
  providers: [PetsResolver, PetsService],
  exports: [PetsService],
})
export class PetsModule {}
