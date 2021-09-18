import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/infrastructure/database/database.module';
import { UserModule } from './modules/users/user.module';
import { TaskEntity } from './modules/tasks/entities/task.entity';
import { MessageModule } from './modules/messages/message.module';

@Module({
  imports: [DatabaseModule, TaskEntity, MessageModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
