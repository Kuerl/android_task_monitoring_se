import { Injectable, BadRequestException } from '@nestjs/common';
import { TeamRepository } from '../repositories/teams.repositories';
import { TeamDto, TeamNameDto, TeamMemberRole } from '../common/dtos/team.dto';
import { MemberRole } from '../common/enum/teamrole.enum';
import { UserRepository } from '../../users/repositories/user.repository';
import { TeamMember } from '../common/dtos/teammember.dto';
import { v4 as uuidv4 } from 'uuid';
import { TeamUserRepository } from '../repositories/team-user.repository';
import { TeamUserEntity } from '../entities/teamuser.entity';
import { TeamEntity } from '../entities/team.entity';

@Injectable()
export class TeamService {
  private teamInformation: any[];

  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly userRepository: UserRepository,
    private readonly teamUserRepository: TeamUserRepository,
  ) {}

  // By username, return all teams that this member exist.
  async getTeamsByUserId(username: string): Promise<TeamUserEntity[]> {
    const userQuery = await this.userRepository.findOne({
      where: { username: username },
    });
    const teamUserQuery = await this.teamUserRepository.find({
      where: { user: userQuery },
      relations: ['team'],
    });
    return teamUserQuery;
  }

  // By team_Id, return all information about team and member of this team.
  async getTeamInformation(team_Id: string): Promise<any> {
    const teamQuery = await this.teamRepository.findOne({
      where: {
        pkTeam_Id: team_Id,
      },
    });
    if (!teamQuery) {
      throw new BadRequestException('Team is not existed');
    }
    const teamUserQuery = await this.teamUserRepository.find({
      relations: ['team', 'user'],
      where: { team: teamQuery },
    });
    this.teamInformation = [];
    for (let i = 0; i < teamUserQuery.length; i++) {
      const element = teamUserQuery[i];
      this.teamInformation.push(element);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, pkAccount_Id, ...res } = element.user;
      this.teamInformation[i].user = res;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { team_user_Id, team, ...res2 } = this.teamInformation[i];
      this.teamInformation[i] = res2;
    }
    return {
      team: teamQuery,
      members: this.teamInformation,
    };
  }

  async createATeam(teamDto: TeamDto): Promise<any> {
    if (!(teamDto.memberRole in MemberRole)) {
      throw new BadRequestException('Member Role is not valid');
    }
    const pkUuid = uuidv4();
    const userQuery = await this.userRepository.findOne({
      where: { username: teamDto.username },
    });
    if (!userQuery) {
      throw new BadRequestException('User is not existed');
    }
    // Create team
    const willBeCreateTeam = this.teamRepository.create(teamDto);
    willBeCreateTeam.pkTeam_Id = pkUuid;
    await this.teamRepository.save(willBeCreateTeam);
    // Create team user owner
    const plainTeamUser = {
      memberRole: teamDto.memberRole,
      team: willBeCreateTeam,
      user: userQuery,
    };
    const willBeCreateTeamUser = this.teamUserRepository.create(plainTeamUser);
    const teamUserCreated = await this.teamUserRepository.save(
      willBeCreateTeamUser,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, teamUserId, ...res } = teamUserCreated;
    return res;
  }

  async addMember(teamMember: TeamMember, team_Id: string): Promise<any> {
    const notValidUser = [];
    const memberAdded = [];
    const memberExisted = [];
    const teamQuery = await this.teamRepository.findOne({
      where: {
        pkTeam_Id: team_Id,
      },
    });
    if (!teamQuery) {
      throw new BadRequestException('Team is not existed');
    }
    for (let i = 0; i < teamMember.username.length; i++) {
      const element = teamMember.username[i];
      const userQuery = await this.userRepository.findOne({
        where: { username: element },
      });
      if (!userQuery) {
        notValidUser.push(element);
        continue;
      }
      const memberExistedTeamUser = await this.teamUserRepository.findOne({
        where: {
          user: userQuery,
          team: teamQuery,
        },
      });
      if (memberExistedTeamUser) {
        memberExisted.push(element);
        continue;
      }
      const plainTeamUser = {
        memberRole: MemberRole.Member,
        team: teamQuery,
        user: userQuery,
      };
      const willBeAddedMember = this.teamUserRepository.create(plainTeamUser);
      await this.teamUserRepository.save(willBeAddedMember);
      memberAdded.push(element);
    }
    return {
      addedMember: memberAdded,
      exitedMember: memberExisted,
      notValidUsername: notValidUser,
    };
  }

  async reName(teamNameDto: TeamNameDto, team_Id: string): Promise<TeamEntity> {
    const teamQuery = await this.teamRepository.findOne({
      where: {
        pkTeam_Id: team_Id,
      },
    });
    if (!teamQuery) {
      throw new BadRequestException('Team is not existed');
    }
    teamQuery.teamName = teamNameDto.teamName;
    return this.teamRepository.save(teamQuery);
  }

  async changeMemberRole(
    teamMemberRole: TeamMemberRole,
    team_Id: string,
    username: string,
  ): Promise<TeamUserEntity> {
    const teamQuery = await this.teamRepository.findOne({
      where: {
        pkTeam_Id: team_Id,
      },
    });
    if (!teamQuery) {
      throw new BadRequestException('Team is not existed');
    }
    const userQuery = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!userQuery) {
      throw new BadRequestException('User is not existed');
    }
    if (!(teamMemberRole.memberRole in MemberRole)) {
      throw new BadRequestException('Invalid Member Role');
    }
    const willBeUpdatedTeamUser = await this.teamUserRepository.findOne({
      where: {
        user: userQuery,
        team: teamQuery,
      },
    });
    willBeUpdatedTeamUser.memberRole = teamMemberRole.memberRole;
    return this.teamUserRepository.save(willBeUpdatedTeamUser);
  }

  async deleteMember(team_Id: string, username: string): Promise<any> {
    const userQuery = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!userQuery) {
      throw new BadRequestException('User is not existed');
    }
    const teamQuery = await this.teamRepository.findOne({
      where: {
        pkTeam_Id: team_Id,
      },
    });
    if (!teamQuery) {
      throw new BadRequestException('Team is not existed');
    }
    const willBeDeleteTeamUser = await this.teamUserRepository.findOne({
      where: {
        user: userQuery,
        team: teamQuery,
      },
    });
    return this.teamUserRepository.delete(willBeDeleteTeamUser);
  }
}
