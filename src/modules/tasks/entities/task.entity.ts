import {
  ChildEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { TaskEntityType } from '../common/enum/taskentitytype.enum';
import { TaskType } from '../common/enum/tasktype.enum';
import { TeamEntity } from './team.entity';
import { ManyToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('Task')
@TableInheritance({
  column: { type: 'enum', enum: TaskEntityType, name: 'TaskType' },
})
export class TaskEntity {
  @PrimaryGeneratedColumn()
  pkTask_Id: number;

  @Column({
    name: 'Title',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
  })
  title: string;

  @Column({
    name: 'Content',
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
  })
  content: string;

  @Column({
    name: 'TaskRole',
    type: 'enum',
    enum: TaskType,
    nullable: false,
  })
  taskRole: TaskType;

  @Column({
    name: 'Start',
    type: 'datetime',
    nullable: false,
  })
  start: Date;

  @Column({
    name: 'Due',
    type: 'datetime',
    nullable: false,
  })
  due: Date;
}

@ChildEntity(TaskEntityType.Personal)
export class PersonalTaskEntity extends TaskEntity {}

@ChildEntity(TaskEntityType.Team)
export class TeamTaskEntity extends TaskEntity {
  @ManyToOne(() => TeamEntity, (team) => team.task)
  team: TaskEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
