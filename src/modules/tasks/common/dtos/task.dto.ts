import { TaskEntityType } from '../enum/taskentitytype.enum';
import { TaskType } from '../enum/tasktype.enum';

export class BaseTaskCreateDto {
  title: string;
  content: string;
  taskRole: TaskType;
  taskType: TaskEntityType;

  // @IsDate()
  start: Date;
  // @IsDate()
  due: Date;
}
