import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  websocketsv;

  @SubscribeMessage('taskmsg')
  handleMsgArrive(@MessageBody() message: string) {
    this.websocketsv.emit('taskmsg', message);
  }
}
