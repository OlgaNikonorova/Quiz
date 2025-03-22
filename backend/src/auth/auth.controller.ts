import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { SignInResponseDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiForbiddenResponse({ description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto) {
    return this._authService.signIn(loginDto);
  }

  @Post('register')
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid username or password' })
  @ApiConflictResponse({ description: 'Username already taken' })
  register(@Body() registerDto: RegisterDto) {
    return this._authService.signUp(registerDto);
  }
}
