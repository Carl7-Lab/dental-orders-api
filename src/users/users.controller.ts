import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@ApiTags('users')
@RoleProtected(Role.ADMIN)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un usuario',
    description: 'Crear un usuario nuevo para la clínica',
  })
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(dto));
  }

  @Get()
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Obtener todos los usuarios de la clínica',
  })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<UserEntity[]> {
    return (await this.usersService.findAll()).map(
      (user) => new UserEntity(user),
    );
  }

  @Get(':id')
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener un usuario',
    description: 'Obtener un usuario de la clínica',
  })
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario',
    description: 'Actualizar un usuario de la clínica',
  })
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.usersService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Eliminar un usuario de la clínica',
  })
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return new UserEntity(await this.usersService.remove(id));
  }
}
