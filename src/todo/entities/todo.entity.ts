import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Todo {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: false })
  status: boolean;
}
