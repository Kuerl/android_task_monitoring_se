import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './repositories/teams.repositories';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { UserRepository } from '../users/repositories/user.repository';
import { TeamUserRepository } from './repositories/team-user.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamRepository,
      UserRepository,
      TeamUserRepository,
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
