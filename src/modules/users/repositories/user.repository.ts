import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ResponseUserData } from '../common/dtos/res-user-data.dto';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async userQueryByUsername(username: string): Promise<UserEntity> {
    return this.findOne({
      where: {
        username: username,
      },
    });
  }

  async existedUser(username: string): Promise<ResponseUserData> {
    const userQuery = await this.userQueryByUsername(username);
    if (!userQuery) {
      throw new BadRequestException('Not Found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...res } = userQuery;
    return res;
  }
}
