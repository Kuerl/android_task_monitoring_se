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
  @Post('team/:teamId') // Assign teammates
  createATeamTask(
    @Param('teamId') teamId: string,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    return this.taskService.createATeamTask(teamId, baseTaskCreateDto);
  }

  @Get('team/id/:teamTaskId')
  getATeamTask(@Param('teamTaskId') teamTaskId: string) {
    return this.taskService.getATeamTask(teamTaskId);
  }

  @Get('team/:teamId')
  getAllTeamTasksByTeamId(@Param('teamId') teamId: string) {
    return this.taskService.getAllTeamTasksByTeamId(teamId);
  }

  @Put('team/:teamTaskId/:username')
  editATeamTask(
    @Param('teamTaskId') teamTaskId: string,
    @Param('username') username: string,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    return this.taskService.editATeamTask(
      teamTaskId,
      username,
      baseTaskCreateDto,
    );
  }

  @Delete('team/:teamTaskId/:username')
  deleteATeamTask(
    @Param('teamTaskId') teamTaskId: string,
    @Param('username') username: string,
  ) {
    return this.taskService.deleteATeamTask(teamTaskId, username);
  }
}
