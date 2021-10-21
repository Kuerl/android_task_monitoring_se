import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { MessageRepository } from './repositories/message.repository';
import { TeamRepository } from '../teams/repositories/team.repositories';
import { UserRepository } from '../users/repositories/user.repository';
import { TeamUserRepository } from '../teams/repositories/team-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageRepository,
      TeamRepository,
      UserRepository,
      TeamUserRepository,
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
