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
import { PatientsService } from './patients.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PatientEntity } from './entities/patient.entity';

@Controller('patients')
@ApiTags('patients')
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
  @ApiOperation({
    summary: 'Obtener todos los pacientes',
    description: 'Obtener todos los pacientes de la clínica',
  })
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  async findAll(): Promise<PatientEntity[]> {
    return (await this.patientsService.findAll()).map(
      (patient) => new PatientEntity(patient),
    );
  }

  @Get(':id')
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
