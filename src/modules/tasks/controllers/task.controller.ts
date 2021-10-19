import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseTaskCreateDto } from '../common/dtos/task.dto';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // PERSONAL TASK
  @Post('personal/:username')
  createAPersonalTask(
    @Param('username') username: string,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    return this.taskService.createAPersonalTask(username, baseTaskCreateDto);
  }

  @Get('personal/:username')
  getAllPersonalTask(@Param('username') username: string) {
    return this.taskService.getAllPersonalTask(username);
  }

  @Get('personal/select/:personalTaskId')
  getAPersonalTask(@Param('personalTaskId') taskId: number) {
    return this.taskService.getAPersonalTask(taskId);
  }

  @Put('personal/select/:personalTaskId')
  editAPersonalTask(
    @Param('personalTaskId') taskId: number,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    return this.taskService.editAPersonalTask(taskId, baseTaskCreateDto);
  }

  @Delete('personal/select/:personalTaskId')
  deleteAPersonalTask(@Param('personalTaskId') taskId: number) {
    return this.taskService.deleteAPersonalTask(taskId);
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
