export class MessageDto {
  message: string;

  flag: boolean;
}

export class EditMessageDto {
  pkMessage_Id: number;

  flag: boolean;
}

export class ResponseMessageDto {
  message: string;

  flag: boolean;

  create_up: Date;
}
