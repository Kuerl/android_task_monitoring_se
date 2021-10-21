import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/infrastructure/database/database.module';
import { UserModule } from './modules/users/user.module';
import { MessageModule } from './modules/messages/message.module';
import { TaskModule } from './modules/tasks/task.module';
import { TeamModule } from './modules/teams/team.module';

@Module({
  imports: [DatabaseModule, TaskModule, MessageModule, UserModule, TeamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
