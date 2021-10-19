import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TaskEntityType } from '../common/enum/taskentitytype.enum';
import { UserEntity } from '../../users/entities/user.entity';
import {
  TaskEntity,
  PersonalTaskEntity,
  TeamTaskEntity,
} from '../entities/task.entity';

@Injectable()
@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {}

@Injectable()
@EntityRepository(PersonalTaskEntity)
export class PersonalTaskRepository extends Repository<PersonalTaskEntity> {
  async getAllPersonalTask(user: UserEntity): Promise<PersonalTaskEntity[]> {
    return this.find({
      where: {
        user: user,
        TaskType: TaskEntityType.Personal,
      },
    });
  }
}

@Injectable()
@EntityRepository(TeamTaskEntity)
export class TeamTaskRepository extends Repository<TeamTaskEntity> {}
