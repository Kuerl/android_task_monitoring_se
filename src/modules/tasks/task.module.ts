import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './repositories/teams.repositories';
import { TaskController } from './controllers/task.controller';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { UserRepository } from '../users/repositories/user.repository';
import { TeamUserRepository } from './repositories/teamuser.repository';
import {
  TaskRepository,
  PersonalTaskRepository,
  TeamTaskRepository,
} from './repositories/task.repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamRepository,
      TaskRepository,
      PersonalTaskRepository,
      TeamTaskRepository,
      UserRepository,
      TeamUserRepository,
    ]),
  ],
  controllers: [TaskController, TeamController],
  providers: [TeamService],
})
export class TaskModule {}
