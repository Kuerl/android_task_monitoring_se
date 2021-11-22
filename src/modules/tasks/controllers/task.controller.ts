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
  } // unnecessary

  @Put('personal/:username/:personalTaskId')
  editAPersonalTask(
    @Param('personalTaskId') taskId: number,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
    @Param('username') username: string,
  ) {
    return this.taskService.editAPersonalTask(
      taskId,
      baseTaskCreateDto,
      username,
    );
  }

  @Delete('personal/:username/:personalTaskId')
  deleteAPersonalTask(
    @Param('personalTaskId') taskId: number,
    @Param('username') username: string,
  ) {
    return this.taskService.deleteAPersonalTask(taskId, username);
  }

  // TEAM TASK
  @Post('team/:teamId') // Assign teammates
  createATeamTask(
    @Param('teamId') teamId: string,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    return this.taskService.createATeamTask(teamId, baseTaskCreateDto);
  }

  // @Get('team/id/:teamTaskId')
  // getATeamTask(@Param('teamTaskId') teamTaskId: string) {
  //   return this.taskService.getATeamTask(teamTaskId);
  // }

  @Get('team/:teamId')
  getAllTeamTasksByTeamId(@Param('teamId') teamId: string) {
    return this.taskService.getAllTeamTasksByTeamId(teamId);
  }

  @Put('team/:teamId/:teamTaskId/:username')
  editATeamTask(
    @Param('teamId') teamId: string,
    @Param('teamTaskId') teamTaskId: string,
    @Param('username') username: string,
    @Body() baseTaskCreateDto: BaseTaskCreateDto,
  ) {
    return this.taskService.editATeamTask(
      teamId,
      teamTaskId,
      username,
      baseTaskCreateDto,
    );
  }

  @Delete('team/:teamId/:teamTaskId/:username')
  deleteATeamTask(
    @Param('teamId') teamId: string,
    @Param('teamTaskId') teamTaskId: string,
    @Param('username') username: string,
  ) {
    return this.taskService.deleteATeamTask(teamId, teamTaskId, username);
  }
}
