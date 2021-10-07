import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
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
export class PersonalTaskRepository extends Repository<PersonalTaskEntity> {}

@Injectable()
@EntityRepository(TeamTaskEntity)
export class TeamTaskRepository extends Repository<TeamTaskEntity> {}
