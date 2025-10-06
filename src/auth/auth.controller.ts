import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto';
import { Tokens } from './interfaces';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @ApiOperation({
    summary: 'Registro local',
    description: 'Registro local de un usuario para iniciar sesión',
  })
  @ApiCreatedResponse({ type: AuthEntity })
  async signupLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Inicio de sesión local',
    description: 'Inicio de sesión local de un usuario',
  })
  @ApiOkResponse({ type: AuthEntity })
  signinLocal(@Body() dto: SigninDto): Promise<AuthEntity> {
    return this.authService.signinLocal(dto);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener perfil del usuario',
    description: 'Obtener perfil del usuario',
  })
  @ApiOkResponse({ type: UserEntity })
  getProfile(@GetCurrentUser() user: UserEntity): UserEntity {
    return user;
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresco de tokens',
    description: 'Refresco de tokens de un usuario',
  })
  @ApiOkResponse({ type: AuthEntity })
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
