import { UseFacebookAuth } from '@nestjs-hybrid-auth/all';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @UseFacebookAuth()
  @Get('facebook')
  facebookLogin() {}

  @UseFacebookAuth()
  @Get('facebook/redirect')
  async facebookLoginCallback(@Request() req) {
    await this.authService.loginWithFacebook(req.hybridAuthResult);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user; // Extracted from JWT payload
  }
}
