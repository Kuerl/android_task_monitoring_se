import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { TeamDto } from '../common/dtos/team.dto';

@Injectable()
@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {
  async createATeam(teaDto: TeamDto): Promise<TeamEntity> {
    const pkUuid = uuidv4();
    const willBeCreateTeam = this.create(teaDto);
    willBeCreateTeam.pkTeam_Id = pkUuid;
    return this.save(willBeCreateTeam);
  }

  async allTeamByUserRelation(userEntity: UserEntity): Promise<TeamEntity[]> {
    return this.find({
      where: { user: userEntity },
      relations: ['team'],
    });
  }

  async teamByTeamId(teamId: string): Promise<TeamEntity> {
    return this.findOne({
      where: {
        pkTeam_Id: teamId,
      },
    });
  }
}