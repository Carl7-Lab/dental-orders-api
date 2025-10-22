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
import { PaginatedPatients, PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PatientEntity } from './entities/patient.entity';
import { RoleProtected } from 'src/auth/decorator/role-protected.decorator';
import { Role } from '@prisma/client';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('patients')
@ApiTags('patients')
@RoleProtected(Role.ADMIN, Role.DOCTOR)
@ApiBearerAuth()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un paciente',
    description: 'Crear un paciente nuevo para la clínica',
  })
  @ApiCreatedResponse({ type: PatientEntity })
  async create(@Body() dto: CreatePatientDto): Promise<PatientEntity> {
    return new PatientEntity(await this.patientsService.create(dto));
  }

  @Get()
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener todos los pacientes',
    description: 'Obtener todos los pacientes de la clínica',
  })
  @ApiOkResponse({ type: PatientEntity, isArray: true })
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
    data: PatientEntity[];
  }> {
    const result: PaginatedPatients =
      await this.patientsService.findAll(paginationDto);

    return {
      pagination: result.pagination,
      data: result.data.map((patient) => new PatientEntity(patient)),
    };
  }

  @Get(':id')
  @RoleProtected(Role.ADMIN, Role.DOCTOR, Role.INTERN)
  @ApiOperation({
    summary: 'Obtener un paciente',
    description: 'Obtener un paciente de la clínica',
  })
  @ApiOkResponse({ type: PatientEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PatientEntity> {
    return new PatientEntity(await this.patientsService.findOne(id));
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un paciente',
    description: 'Actualizar un paciente de la clínica',
  })
  @ApiOkResponse({ type: PatientEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientDto,
  ): Promise<PatientEntity> {
    return new PatientEntity(await this.patientsService.update(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un paciente',
    description: 'Eliminar un paciente de la clínica',
  })
  @ApiOkResponse({ type: PatientEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PatientEntity> {
    return new PatientEntity(await this.patientsService.remove(id));
  }
}
