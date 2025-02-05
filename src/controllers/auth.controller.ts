import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.authService.register(body);

    return {
      _id: user._id,
      redirectUrl: 'http://localhost:3000/register',
      accessToken: user.accessToken,
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res) {
    const resp = await this.authService.login(body);
    res.cookie('token', resp.accessToken, {
      httpOnly: true,
      // secure: true, // Set to true in production (HTTPS)
      // sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });
    return res.send(resp);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('token');
    return res.json({ message: 'Logged out' });
  }
}
