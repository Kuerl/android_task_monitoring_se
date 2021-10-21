import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(4, 10, { message: 'Invalid Username Length' })
  username: string;

  @IsString()
  @Length(6, 100, { message: 'Invalid Password Length' })
  password: string;
}
