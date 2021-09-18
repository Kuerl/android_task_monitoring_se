import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { MemberRole } from '../common/enum/teamrole.enum';
import { AccountEntity } from '../../users/entities/user.entity';
import { TeamTaskEntity } from './task.entity';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity('Team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  pkTeam_Id: number;

  @Column({
    name: 'MemberRole',
    type: 'enum',
    enum: MemberRole,
    nullable: false,
  })
  memberRole: MemberRole;

  @ManyToOne(() => AccountEntity, (user) => user.team)
  user: AccountEntity;

  @OneToMany(() => TeamTaskEntity, (task) => task.team)
  task: TeamTaskEntity[];

  @OneToMany(() => MessageEntity, (message) => message.team)
  message: TeamTaskEntity[];
}
