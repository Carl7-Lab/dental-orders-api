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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DoctorEntity } from './entities/doctor.entity';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';

@Controller('doctors')
@ApiTags('doctors')
@RoleProtected(Role.ADMIN)
@ApiBearerAuth()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un doctor',
    description: 'Crear un doctor nuevo para la clínica',
  })
  @ApiCreatedResponse({ type: DoctorEntity })
  async create(@Body() dto: CreateDoctorDto): Promise<DoctorEntity> {
    return new DoctorEntity(await this.doctorsService.create(dto));
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los doctores',
    description: 'Obtener todos los doctores de la clínica',
  })
  @ApiOkResponse({ type: DoctorEntity, isArray: true })
  async findAll(): Promise<DoctorEntity[]> {
    return (await this.doctorsService.findAll()).map(
      (doctor) => new DoctorEntity(doctor),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un doctor',
    description: 'Obtener un doctor de la clínica',
  })
  @ApiOkResponse({ type: DoctorEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DoctorEntity> {
    return new DoctorEntity(await this.doctorsService.findOne(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un doctor',
    description: 'Actualizar un doctor de la clínica',
  })
  @ApiOkResponse({ type: DoctorEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDoctorDto,
  ): Promise<DoctorEntity> {
    return new DoctorEntity(await this.doctorsService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un doctor',
    description: 'Eliminar un doctor de la clínica',
  })
  @ApiOkResponse({ type: DoctorEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DoctorEntity> {
    return new DoctorEntity(await this.doctorsService.remove(id));
  }
}
