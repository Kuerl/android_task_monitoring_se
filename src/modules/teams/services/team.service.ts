import { Injectable, BadRequestException } from '@nestjs/common';
import { TeamRepository } from '../repositories/team.repositories';
import { TeamDto, TeamNameDto, TeamMemberRole } from '../common/dtos/team.dto';
import { MemberRole } from '../common/enum/teamrole.enum';
import { UserRepository } from '../../users/repositories/user.repository';
import { TeamMember } from '../common/dtos/teammember.dto';
import { TeamUserRepository } from '../repositories/team-user.repository';
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
  async getTeamsByUsername(username: string): Promise<any> {
    const userQuery = await this.userRepository.userQueryByUsername(username);
    if (!userQuery) {
      return { effect: false, status: 'Invalid username' };
    }
    return this.teamUserRepository.allTeamByUserRelation(userQuery);
  }

  // By team_Id, return all information about team and member of this team.
  async getTeamInformation(team_Id: string): Promise<any> {
    const teamQuery = await this.teamRepository.teamInformation(team_Id);
    if (!teamQuery) {
      return { effect: false, status: 'Invalid team_Id' };
    }
    const teamUserQuery = await this.teamUserRepository.allUserOfATeam(
      teamQuery,
    );
    this.teamInformation = [];
    console.log(teamUserQuery);
    // Remove password from the response data
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
      ...teamQuery,
      members: this.teamInformation,
    };
  }

  async createATeam(teamDto: TeamDto): Promise<any> {
    const userQuery = await this.userRepository.userQueryByUsername(
      teamDto.username,
    );
    if (!userQuery) {
      return { effect: false };
    }
    // Create team
    const createdTeam = await this.teamRepository.createATeam(teamDto);
    // Create team user owner
    await this.teamUserRepository.createOwnerOfATeam(userQuery, createdTeam);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return createdTeam;
  }

  async addMember(teamMember: TeamMember, teamId: string): Promise<any> {
    const notValidUser = [];
    const memberAdded = [];
    const memberExisted = [];

    const teamQuery = await this.teamRepository.teamInformation(teamId);
    if (!teamQuery) {
      return { effect: false, status: 'Invalid team_Id' };
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
      const memberExistedTeamUser = await this.teamUserRepository.getATeamUser(
        userQuery,
        teamQuery,
      );
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

  async reName(teamNameDto: TeamNameDto, teamId: string): Promise<TeamEntity> {
    const teamQuery = await this.teamRepository.teamInformation(teamId);
    teamQuery.teamName = teamNameDto.teamName;
    return this.teamRepository.save(teamQuery);
  }

  async changeMemberRole(
    teamMemberRole: TeamMemberRole,
    teamId: string,
    username: string,
  ): Promise<any> {
    if (teamMemberRole.memberRole === MemberRole.Admin) {
      throw new BadRequestException('Invalid Member Role');
    }
    const teamQuery = await this.teamRepository.teamInformation(teamId);
    const ownerQuery = await this.userRepository.userQueryByUsername(username);
    const userQuery = await this.userRepository.userQueryByUsername(
      teamMemberRole.username,
    );
    if (!ownerQuery) {
      return { status: 'Invalid owner' };
    }
    if (!userQuery) {
      return { status: 'Invalid member' };
    }
    const willBeUpdatedTeamUser = await this.teamUserRepository.getATeamUser(
      userQuery,
      teamQuery,
    );
    const owenerCheck = await this.teamUserRepository.getATeamUser(
      ownerQuery,
      teamQuery,
    );
    if (!willBeUpdatedTeamUser || !owenerCheck) {
      return { status: 'Invalid request' };
    }
    if (owenerCheck.memberRole === MemberRole.Admin) {
      willBeUpdatedTeamUser.memberRole = teamMemberRole.memberRole;
      return this.teamUserRepository.save(willBeUpdatedTeamUser);
    }
    return { status: 'No effect member role' };
  }

  async deleteMember(
    teamId: string,
    username: string,
    delusername: string,
  ): Promise<any> {
    const userQuery = await this.userRepository.userQueryByUsername(username);
    const teamQuery = await this.teamRepository.teamInformation(teamId);
    const delusernameQuery = await this.userRepository.userQueryByUsername(
      delusername,
    );
    if (!userQuery || !delusername) {
      return { status: 'Invalid user' };
    }
    const willBeDeleteOwnerTeamUser =
      await this.teamUserRepository.getATeamUser(userQuery, teamQuery);
    if (!willBeDeleteOwnerTeamUser) {
      throw new BadRequestException('Not Found');
    }
    if (willBeDeleteOwnerTeamUser.memberRole !== MemberRole.Admin) {
      return { effect: false };
    } else {
      const willBeDeleteTeamUser = await this.teamUserRepository.getATeamUser(
        delusernameQuery,
        teamQuery,
      );
      this.teamUserRepository.delete(willBeDeleteTeamUser);
      return { effect: true };
    }
  }

  async outTeam(teamId: string, username: string) {
    const userQuery = await this.userRepository.userQueryByUsername(username);
    const teamQuery = await this.teamRepository.teamInformation(teamId);
    const willBeDeleteTeamUser = await this.teamUserRepository.getATeamUser(
      userQuery,
      teamQuery,
    );
    if (!willBeDeleteTeamUser) {
      throw new BadRequestException('Not Found');
    }
    this.teamUserRepository.delete(willBeDeleteTeamUser);
    return { effect: true };
  }
}
