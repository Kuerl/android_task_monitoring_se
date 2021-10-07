import { Controller, Post } from '@nestjs/common';

@Controller('task')
export class TaskController {
  @Post('personal/:username')
  createAPersonalTask() {
    return;
  }

  @Post('team/:team_Id')
  createATaskOfTeam() {
    return;
  }
}
