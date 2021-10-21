import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from 'src/modules/messages/entities/message.entity';

@Injectable()
@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
