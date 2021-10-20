import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task.controller';
import { UserRepository } from '../users/repositories/user.repository';
import {
  TaskRepository,
  PersonalTaskRepository,
  TeamTaskRepository,
} from './repositories/task.repositories';
import { TaskService } from './services/task.service';
import { TeamRepository } from '../teams/repositories/team.repositories';
import { TeamUserRepository } from '../teams/repositories/team-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository,
      PersonalTaskRepository,
      TeamTaskRepository,
      UserRepository,
      TeamRepository,
      TeamUserRepository,
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
