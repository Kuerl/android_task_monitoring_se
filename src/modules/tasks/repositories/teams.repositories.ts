import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';

@Injectable()
@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {}
