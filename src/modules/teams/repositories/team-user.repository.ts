import { EntityRepository, Repository } from 'typeorm';
import { TeamUserEntity } from '../entities/teamuser.entity';
import { TeamEntity } from '../entities/team.entity';
import { MemberRole } from '../common/enum/teamrole.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { plainToClass } from 'class-transformer';

@EntityRepository(TeamUserEntity)
export class TeamUserRepository extends Repository<TeamUserEntity> {
  async assignUserOfATeam(
    memberRole: MemberRole,
    teamData: TeamEntity,
    userData: UserEntity,
  ): Promise<TeamUserEntity[]> {
    const teamUserObject = {
      memberRole: memberRole,
      team: teamData,
      user: userData,
    };
    const plainTeamUser: TeamUserEntity = plainToClass(
      TeamUserEntity,
      teamUserObject,
    );
    return this.save([plainTeamUser]);
  }

  async allUserOfATeam(teamQuery: TeamEntity): Promise<TeamUserEntity[]> {
    return this.find({
      relations: ['team', 'user'],
      where: { team: teamQuery },
    });
  }
}
