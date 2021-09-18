import { MessageEntity } from 'src/modules/messages/entities/message.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from '../../tasks/entities/team.entity';

@Entity('Account')
export class AccountEntity {
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
    name: 'PhoneNumber',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    name: 'Email',
    type: 'varchar',
    length: 40,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'Description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  message: MessageEntity[];

  @OneToMany(() => TeamEntity, (team) => team.user)
  team: TeamEntity[];
}
