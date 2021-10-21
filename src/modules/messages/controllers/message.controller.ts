import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { EditMessageDto, MessageDto } from '../common/dtos/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':teamId')
  getAllMessageOfATeam(@Param('teamId') teamId: string) {
    return this.messageService.getAllMessageOfATeam(teamId);
  }

  @Post(':teamId/:username')
  createAMessage(
    @Param('teamId') teamId: string,
    @Param('username') username: string,
    @Body() messageDto: MessageDto,
  ) {
    return this.messageService.createAMessage(teamId, username, messageDto);
  }

  @Put(':teamId/:username') // for flag
  editAMessage(
    @Param('teamId') teamId: string,
    @Param('username') username: string,
    @Body() messageDto: EditMessageDto,
  ) {
    return this.messageService.editAMessage(teamId, username, messageDto);
  }
}
