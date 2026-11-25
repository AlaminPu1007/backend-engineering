import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get data by using query params
  @Get()
  getUserByQuery(@Query('name') name: string) {
    return this.userService.findUserByQuery(name);
  }

  // Get users by params using id
  @Get(':id')
  getUserById(@Param('id') id: number | string) {
    return this.userService.getUserByParams(id);
  }

  // create users
  @Post()
  createUser(@Body() CreateUserDtoData: CreateUserDto) {
    return this.userService.createNewUser(CreateUserDtoData);
  }

  // update users
  @Put(':id')
  updateUser(
    @Param('id') id: number | string,
    @Body() UpdateUserDtoData: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, UpdateUserDtoData);
  }
}
