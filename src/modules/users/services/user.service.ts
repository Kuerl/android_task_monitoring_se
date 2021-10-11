import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { LoginDto, RegisterUserDto, UpdateUserDto } from '../common/dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existedInformation = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    if (existedInformation) {
      throw new BadRequestException('Existed Account Information');
    }
    const plainUserData = plainToClass(UserEntity, registerUserDto);
    return this.userRepository.save(plainUserData);
  }

  async login(loginDto: LoginDto): Promise<{ login: boolean }> {
    const account = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (account && account.password === loginDto.password) {
      return { login: true };
    }
    throw new BadRequestException('Login Fail');
  }

  async getUserInformation(username: string): Promise<UserEntity> {
    const account = await this.userRepository.findOne({
      where: { username },
    });
    return account;
  }

  async updateUserInformation(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const account = await this.userRepository.findOne({
      where: { username },
    });
    return this.userRepository.save({
      ...account,
      ...updateUserDto,
    });
  }

  async deleteAccount(username: string): Promise<UserEntity> {
    const account = await this.userRepository.findOne({
      where: { username },
    });
    account.active = false;
    return this.userRepository.save(account);
  }
}
