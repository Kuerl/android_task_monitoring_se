import { EntityRepository, Repository } from 'typeorm';
import { TeamUserEntity } from '../entities/teamuser.entity';
import { TeamEntity } from '../entities/team.entity';
import { MemberRole } from '../common/enum/teamrole.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(TeamUserEntity)
export class TeamUserRepository extends Repository<TeamUserEntity> {
  async allUserOfATeam(teamQuery: TeamEntity): Promise<TeamUserEntity[]> {
    return this.find({
      relations: ['team', 'user'],
      where: { team: teamQuery },
    });
  }

  async getATeamUser(
    user: UserEntity,
    team: TeamEntity,
  ): Promise<TeamUserEntity> {
    const userTeamEntity = await this.findOne({
      user,
      team,
    });
    if (userTeamEntity) {
      return userTeamEntity;
    }
    throw new BadRequestException('Not Found');
  }

  async createOwnerOfATeam(userData: UserEntity, teamData: TeamEntity) {
    const createTeamUser = {
      user: userData,
      team: teamData,
      memberRole: MemberRole.Admin,
    };
    const plainTeamUser = plainToClass(TeamUserEntity, createTeamUser);
    return this.save(plainTeamUser);
  }

  async allTeamByUserRelation(
    userEntity: UserEntity,
  ): Promise<TeamUserEntity[]> {
    const teamsQuery = await this.find({
      where: { user: userEntity },
      relations: ['team'],
    });
    if (teamsQuery) {
      return teamsQuery;
    }
    throw new BadRequestException('Not Found');
  }
}
