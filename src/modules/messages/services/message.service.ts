import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamUserRepository } from 'src/modules/teams/repositories/team-user.repository';
import { TeamRepository } from 'src/modules/teams/repositories/team.repositories';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { MessageDto, ResponseMessageDto } from '../common/dtos/message.dto';
import { MessageRepository } from '../repositories/message.repository';
import { plainToClass } from 'class-transformer';
import { MessageEntity } from '../entities/message.entity';
import { MessageGateway } from '../gateways/message.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly teamRepository: TeamRepository,
    private readonly userRepository: UserRepository,
    private readonly teamUserRepository: TeamUserRepository,
    private readonly messageGateway: MessageGateway,
  ) {}

  async getAllMessageOfATeam(teamId: string): Promise<MessageEntity[]> {
    const resMsgs = [];
    const teamQuery = await this.teamRepository.findOne({
      where: { pkTeam_Id: teamId },
    });
    if (!teamQuery) {
      throw new BadRequestException('Not Found Team');
    }
    const resMsg = await this.messageRepository.find({
      where: {
        team: teamQuery,
      },
      relations: ['user'],
    });
    for (let i = 0; i < resMsg.length; i++) {
      const element = resMsg[i];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { username, ...notres } = element.user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, message, flag, create_up } = element;
      resMsgs.push({ message, flag, create_up, username });
    }
    return resMsgs;
  }

  async createAMessage(
    teamId: string,
    username: string,
    messageDto: MessageDto,
  ): Promise<ResponseMessageDto> {
    const teamQuery = await this.teamRepository.findOne({
      where: { pkTeam_Id: teamId },
    });
    if (!teamQuery) {
      throw new BadRequestException('Not Found Team');
    }
    const userQuery = await this.userRepository.userQueryByUsername(username);
    if (!userQuery) {
      throw new BadRequestException('Not Found User');
    }
    const userTeam = await this.teamUserRepository.findOne({
      where: {
        user: userQuery,
        team: teamQuery,
      },
    });
    if (!userTeam) {
      throw new BadRequestException('Not Allow');
    }
    const messagePlain = plainToClass(MessageEntity, messageDto);
    messagePlain.user = userQuery;
    messagePlain.team = teamQuery;
    const messageCreate = await this.messageRepository.save(messagePlain);
    this.messageGateway.websocketsv.emit(teamId, {
      username: username,
      message: messageDto.message,
      flag: messageDto.flag,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, team, pkMessage_Id, ...res } = messageCreate;
    return res;
  }

  // async editAMessage(
  //   teamId: string,
  //   username: string,
  //   messageDto: EditMessageDto,
  // ): Promise<ResponseMessageDto> {
  //   const teamQuery = await this.teamRepository.findOne({
  //     where: { pkTeam_Id: teamId },
  //   });
  //   if (!teamQuery) {
  //     throw new BadRequestException('Not Found Team');
  //   }
  //   const userQuery = await this.userRepository.userQueryByUsername(username);
  //   if (!userQuery) {
  //     throw new BadRequestException('Not Found User');
  //   }
  //   const updateMessage = await this.messageRepository.findOne({
  //     where: {
  //       pkMessage_Id: messageDto.pkMessage_Id,
  //       user: userQuery,
  //       team: teamQuery,
  //     },
  //   });
  //   if (!updateMessage) {
  //     throw new BadRequestException('Not Allow');
  //   }
  //   return this.messageRepository.save({
  //     ...updateMessage,
  //     ...messageDto,
  //   });
  // }
}
