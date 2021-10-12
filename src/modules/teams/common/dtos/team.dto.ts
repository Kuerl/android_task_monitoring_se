import { MemberRole } from '../enum/teamrole.enum';
import { IsString, Length } from 'class-validator';

export class TeamDto implements TeamNameDto {
  teamName: string;
  @IsString()
  @Length(5, 20, { message: 'Invalid Username' })
  username: string; // For the admin

  @IsString()
  memberRole: MemberRole;
}

export class TeamNameDto {
  @IsString()
  @Length(1, 31, { message: "Invalid Team's Name" })
  teamName: string;
}

export class TeamMemberRole {
  @IsString()
  memberRole: MemberRole;
}
