import { MessageEntity } from 'src/modules/messages/entities/message.entity';
import { PersonalTaskEntity } from 'src/modules/tasks/entities/task.entity';
import { TeamUserEntity } from 'src/modules/teams/entities/teamuser.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  pkAccount_Id: number;

  @Column({
    name: 'Username',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    name: 'Password',
    type: 'varchar',
    length: 120,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'FirstName',
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'LastName',
    type: 'varchar',
    length: 40,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'Description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'Active',
    type: 'bool',
    nullable: false,
    default: true,
  })
  active: boolean;

  @OneToMany(() => MessageEntity, (message) => message.user)
  message: MessageEntity[];

  @OneToMany(() => TeamUserEntity, (teamuser) => teamuser.team)
  teamuser: TeamUserEntity[];

  @OneToMany(() => PersonalTaskEntity, (personaltask) => personaltask.user)
  personaltask: PersonalTaskEntity[];
}
