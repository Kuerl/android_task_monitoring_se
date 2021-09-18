import { TeamEntity } from 'src/modules/tasks/entities/team.entity';
import { AccountEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  pkMessage_Id: number;

  @Column({
    name: 'Message',
    type: 'text',
    nullable: false,
  })
  message: string;

  @Column({
    name: 'Flag',
    type: 'bool',
    nullable: false,
    default: false,
  })
  flag: boolean;

  @CreateDateColumn({
    name: 'create_up',
    type: 'datetime',
    nullable: false,
  })
  create_up: Date;

  @ManyToOne(() => TeamEntity, (team) => team.message)
  team: TeamEntity;

  @ManyToOne(() => AccountEntity, (user) => user.message)
  user: AccountEntity;
}
