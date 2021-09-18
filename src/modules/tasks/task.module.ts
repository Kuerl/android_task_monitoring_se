import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  TaskEntity,
  // TeamTaskEntity,
  // PersonalTaskEntity,
} from './entities/task.entity';
import { TeamEntity } from './entities/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskEntity,
      // TeamTaskEntity,
      // PersonalTaskEntity,
      TeamEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class TaskModule {}
