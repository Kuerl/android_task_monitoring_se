import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('task')
export class TaskController {
  // PERSONAL TASK
  @Post('personal')
  createAPersonalTask() {
    return;
  }

  @Get('personal/:username')
  getAllPersonalTask() {
    return;
  }

  @Put('personal/')
  editAPersonalTask() {
    return;
  }

  // TEAM TASK
  @Post('team/:team_Id')
  createATaskOfTeam() {
    return;
  }
}
