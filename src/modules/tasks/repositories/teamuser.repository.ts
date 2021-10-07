import { EntityRepository, Repository } from 'typeorm';
import { TeamUserEntity } from '../entities/teamuser.entity';

@EntityRepository(TeamUserEntity)
export class TeamUserRepository extends Repository<TeamUserEntity> {}
