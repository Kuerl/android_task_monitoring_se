import { Column, Entity, OneToMany } from 'typeorm';
import { TeamTaskEntity } from './task.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { PrimaryColumn } from 'typeorm';
import { TeamUserEntity } from './teamuser.entity';

@Entity('Team')
export class TeamEntity {
  @PrimaryColumn({ unique: false })
  pkTeam_Id: string;

  @Column({
    name: 'TeamName',
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  teamName: string;

  @OneToMany(() => TeamTaskEntity, (task) => task.team)
  task: TeamTaskEntity[];

  @OneToMany(() => MessageEntity, (message) => message.team)
  message: MessageEntity[];

  @OneToMany(() => TeamUserEntity, (teamuser) => teamuser.team)
  teamuser: TeamUserEntity[];
}
