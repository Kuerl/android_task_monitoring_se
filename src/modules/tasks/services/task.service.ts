import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseTaskCreateDto } from '../common/dtos/task.dto';
import { UserRepository } from '../../users/repositories/user.repository';
import { plainToClass } from 'class-transformer';
import { PersonalTaskEntity, TaskEntity } from '../entities/task.entity';
import {
  PersonalTaskRepository,
  TeamTaskRepository,
} from '../repositories/task.repositories';
import { TaskEntityType } from '../common/enum/taskentitytype.enum';
import { TaskResponseDto } from '../common/dtos/task-response.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly personalTaskRepository: PersonalTaskRepository,
    private readonly teamTaskRepository: TeamTaskRepository,
  ) {}

  // PERSONAL
  async createAPersonalTask(
    username: string,
    baseTaskCreateDto: BaseTaskCreateDto,
  ): Promise<TaskResponseDto> {
    if (baseTaskCreateDto.taskType !== TaskEntityType.Personal) {
      throw new BadRequestException('Invalid Route');
    }
    const userQuery = await this.userRepository.userQueryByUsername(username);
    const personalTaskPlain = plainToClass(
      PersonalTaskEntity,
      baseTaskCreateDto,
    );
    const personalTaskCreate =
      this.personalTaskRepository.create(personalTaskPlain);
    personalTaskCreate.user = userQuery;
    this.personalTaskRepository.save(personalTaskCreate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...res } = personalTaskCreate;
    return res;
  }

  async getAllPersonalTask(username: string): Promise<TaskEntity[]> {
    const userQuery = await this.userRepository.userQueryByUsername(username);
    const tasksQuery = await this.personalTaskRepository.getAllPersonalTask(
      userQuery,
    );
    return tasksQuery;
  }

  async getAPersonalTask(taskId: number): Promise<TaskEntity> {
    const taskQuery = await this.personalTaskRepository.findOne({
      where: {
        pkTask_Id: taskId,
      },
    });
    return taskQuery;
  }

  async editAPersonalTask(
    taskId: number,
    baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    const taskQuery = await this.personalTaskRepository.findOne({
      where: {
        pkTask_Id: taskId,
      },
    });
    const updateTask = plainToClass(PersonalTaskEntity, baseTaskCreateDto);
    return this.personalTaskRepository.save({
      ...taskQuery,
      ...updateTask,
    });
  }

  async deleteAPersonalTask(taskId: number): Promise<DeleteResult> {
    const taskQueryDel = await this.personalTaskRepository.findOne({
      where: {
        pkTask_Id: taskId,
      },
    });
    return this.personalTaskRepository.delete(taskQueryDel);
  }

  // TEAM
}
