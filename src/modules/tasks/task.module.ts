import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task.controller';
import { UserRepository } from '../users/repositories/user.repository';
import {
  TaskRepository,
  PersonalTaskRepository,
  TeamTaskRepository,
} from './repositories/task.repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository,
      PersonalTaskRepository,
      TeamTaskRepository,
      UserRepository,
    ]),
  ],
  controllers: [TaskController],
  providers: [],
})
export class TaskModule {}
