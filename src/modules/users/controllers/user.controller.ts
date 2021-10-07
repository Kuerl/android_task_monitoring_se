import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RegisterUserDto } from '../common/dtos/register.dto';
import { LoginDto } from '../common/dtos/login.dto';
import { UpdateUserDto } from '../common/dtos/update.dto';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('user/:username')
  getUserInformation(@Param('username') username: string) {
    return this.userService.getUserInformation(username);
  }

  @Put('user/:username')
  updateUserInformation(
    @Body() updateUserDto: UpdateUserDto,
    @Param('username') username: string,
  ) {
    return this.userService.updateUserInformation(username, updateUserDto);
  }

  @Delete('user/:username')
  deleteAccount(@Param('username') username: string) {
    return this.userService.deleteAccount(username);
  }
}
