import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwt-auth.guard';
import { User } from 'src/models/user.schema';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
    return this.userService.updateUser(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('application/:id')
  async submitUserApplication(@Param('id') id: string, @Body() body) {
    return this.userService.submitContestApplication(id, body);
  }
}
