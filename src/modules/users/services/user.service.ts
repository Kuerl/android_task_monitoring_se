import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { LoginDto, RegisterUserDto, UpdateUserDto } from '../common/dtos';
import { ResponseUserData } from '../common/dtos/res-user-data.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existedInformation = await this.userRepository.userQueryByUsername(
      registerUserDto.username,
    );
    if (existedInformation) {
      throw new BadRequestException('Existed Account Information');
    }
    const plainUserData = plainToClass(UserEntity, registerUserDto);
    return this.userRepository.save(plainUserData);
  }

  // All functions is not contain the authentication guard
  async login(loginDto: LoginDto): Promise<{ login: boolean }> {
    const account = await this.userRepository.userQueryByUsername(
      loginDto.username,
    );
    if (!account) {
      throw new BadRequestException('Not Found Account');
    }
    if (
      account &&
      account.password === loginDto.password &&
      account.active === true
    ) {
      return { login: true };
    }
    return { login: false };
  }

  async getUserInformation(username: string): Promise<ResponseUserData> {
    const account = await this.userRepository.existedUser(username);
    return account;
  }

  async updateUserInformation(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserData> {
    const account = await this.userRepository.userQueryByUsername(username);
    if (!account) {
      throw new BadRequestException('Not Found');
    }
    await this.userRepository.save({
      ...account,
      ...updateUserDto,
    });
    const updatedAccount = await this.userRepository.existedUser(username);
    return updatedAccount;
  }

  async deleteAccount(username: string): Promise<UserEntity> {
    const account = await this.userRepository.userQueryByUsername(username);
    if (account.active === true) {
      account.active = false;
      return this.userRepository.save(account);
    }
    throw new BadRequestException('Invalid Request');
  }

  async reactiveAccount(username: string): Promise<UserEntity> {
    const account = await this.userRepository.userQueryByUsername(username);
    if (account.active === false) {
      account.active = true;
      return this.userRepository.save(account);
    }
    throw new BadRequestException('Invalid Request');
  }
}
