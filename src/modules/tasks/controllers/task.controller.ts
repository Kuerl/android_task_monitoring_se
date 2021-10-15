import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

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

  @Get('personal/:personalTaskId')
  getDetailAPersonalTask() {
    return;
  }

  @Put('personal/:personalTaskId')
  editAPersonalTask() {
    return;
  }

  @Delete()
  deleteAPersonalTask() {
    return;
  }

  // TEAM TASK
  @Post('team/:team_Id') // Assign teammates
  createATaskOfTeam() {
    return;
  }

  @Get('team/user/:username')
  getAllTeamTasks() {
    return;
  }

  @Get('team/:teamTaskId')
  getATeamTask() {
    return;
  }

  @Put('team/:teamTaskId/:username')
  editATeamTask() {
    return;
  }

  @Delete('team/:teamTaskId/:username')
  deleteATeamTask() {
    return;
  }
}
