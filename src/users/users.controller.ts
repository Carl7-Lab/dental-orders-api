import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PaginatedUsers, UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página (por defecto: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página (por defecto: 10)',
  })
  async findAll(@Query() paginationDto: PaginationDto): Promise<{
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: UserEntity[];
  }> {
    const result: PaginatedUsers =
      await this.usersService.findAll(paginationDto);

    return {
      pagination: result.pagination,
      data: result.data.map((user) => new UserEntity(user)),
    };
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
