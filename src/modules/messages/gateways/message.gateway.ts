import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4001)
export class MessageGateway {
  @WebSocketServer()
  websocketsv: Server;

  private logger = new Logger();

  handleConnection(client: Socket) {
    this.logger.log('New client connected');
    client.emit('connection', 'Connection to the server establish');
  }

  @SubscribeMessage('taskmsg')
  handleMsgArrive(@MessageBody() message: string) {
    this.websocketsv.emit('taskmsg', message);
  }
}
