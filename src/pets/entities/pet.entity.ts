import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from '../../owners/entities/owner.entity';

@ObjectType()
@Entity()
export class Pet {
  @Field(() => Int, { description: 'Pet Id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  type?: string;

  @Field(() => Int)
  @Column()
  ownerId: number;

  @Field(() => Owner, { nullable: true })
  @ManyToMany(() => Owner, (owner) => owner.pets)
  owner?: Owner;
}
