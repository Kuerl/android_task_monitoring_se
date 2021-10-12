import { EntityRepository, Repository } from 'typeorm';
import { TeamUserEntity } from '../entities/teamuser.entity';
import { TeamEntity } from '../entities/team.entity';
import { MemberRole } from '../common/enum/teamrole.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { plainToClass } from 'class-transformer';

@EntityRepository(TeamUserEntity)
export class TeamUserRepository extends Repository<TeamUserEntity> {
  async allUserOfATeam(teamQuery: TeamEntity): Promise<TeamUserEntity[]> {
    return this.find({
      relations: ['team', 'user'],
      where: { team: teamQuery },
    });
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
}
