import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(6, 100, { message: 'Invalid Password Length' })
  password: string;

  @IsString()
  @Length(0, 40, { message: 'Invalid First Name Length' })
  firstName: string;

  @IsString()
  @Length(0, 40, { message: 'Invalid First Name Length' })
  lastName: string;

  @IsString()
  description: string;
}
