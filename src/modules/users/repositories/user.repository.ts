import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async userQueryByUsername(username: string): Promise<UserEntity> {
    const userQuery = await this.findOne({
      where: {
        username: username,
      },
    });
    return userQuery;
  }

  async existedUser(username: string): Promise<any> {
    const userQuery = await this.userQueryByUsername(username);
    if (!userQuery) {
      return userQuery;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...res } = userQuery;
    return res;
  }
}
