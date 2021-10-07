import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RegisterUserDto } from '../common/dtos/register.dto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { LoginDto } from '../common/dtos/login.dto';
import { UpdateUserDto } from '../common/dtos/update.dto';

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

  async login(loginDto: LoginDto): Promise<any> {
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
      where: { username: username },
    });
    return account;
  }

  async updateUserInformation(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const account = await this.userRepository.findOne({
      where: { username: username },
    });
    return this.userRepository.save({
      ...account,
      ...updateUserDto,
    });
  }

  async deleteAccount(username: string): Promise<UserEntity> {
    const account = await this.userRepository.findOne({
      where: { username: username },
    });
    account.active = false;
    return this.userRepository.save(account);
  }
}
